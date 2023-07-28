//import files
const createError = require('http-errors');
const User = require('../Models/userModel');
const { successResponse, errorResponse } = require('./responseController');
const mongoose = require('mongoose');
const { findWithID } = require('../Services/findUserByID');
const deleteImage = require('../Helper/deleteImage');
const { createJsonWebToken } = require('../Helper/jsonWebToken');
const { jwtActivationKey, clint_URL } = require('../secret');
const sendEmailWithNodeMail = require('../Helper/email');
const jwt = require('jsonwebtoken');

//find all user api
const getAllUser = async (req, res, next)=>{
    try { 
        const search = req.query.search || '';//searching
        const page = Number(req.query.page) || 1;//pagination, page related first page
        const limit = Number(req.query.limit) || 2;//showing limit in the one page

        //searching function work like this, case insencitive searching
        const searchRegExp = new RegExp('.*'+ search + '.*', 'i');

        //filter function:
        const filter = {
            isAdmin: {$ne: true},//admin not allow to showing
            //showing by serach: search can by email, name, phone
            $or: [
                {name: {$regex: searchRegExp}},
                {email: {$regex: searchRegExp}},
                {phone: {$regex: searchRegExp}},
            ]
        };
        //password not allow to showing
        const options = {password: 0};

        // find the users according filter and password not allow
        const users = await User.find(filter, options)

        .limit(limit)//in the one page how many user is showing
        .skip((page-1)*limit);//one page's users is not allow in to the other page.

        //how many users have after filtering 
        const count = await User.find(filter).countDocuments();        
        if(!users) throw createError(404, 'No users found.');//if user not found

        //response
        return successResponse(res, {
            statusCode:200,
            message:'users were returend successfully',
            payload:{
                users,
                //pagination
                pagination: {
                    totalPage: Math.ceil(count / limit),                  
                    currentPage: page, //total page according to filtered users and according to limit                  
                    previousPage: page - 1 > 0 ? page-1 : null, //current page: first time it is 1
                    nextPage: page+1 <= Math.ceil(count/limit) ? page+1: null
                },
            }, 
        });
    } catch (error) {
        next(error);
    }
};

///Fine one user by user's ID
const getUserByID = async (req, res, next)=>{
    try {
        const id = req.params.id;
        const options = {password: 0};
        //find user by id some code hane another file into the services folder
        const user = await findWithID(User, id, options);// send User model, id, and option

        //response handle
        return successResponse(res, {
            statusCode:200,
            message:'users were returend successfully',
            payload: {user}
        });
    } catch (error) {
        //if mongo id is not correct then handle the mongoose error
        if(error instanceof mongoose.Error){
            next(createError(400, 'Invalid User ID.'));
            return;
        }
        next(error);
    }
};

//delete a single user by id
const deleteUserByID = async(req, res, next)=>{
    try {
        const id = req.params.id;
        const options = {password: 0};
        const user = await findWithID(User, id, options);

        //user image path
        const userImagePath = user.image;
        //image deleting function in the helper folder
        deleteImage(userImagePath);

        //user delete
        await User.findByIdAndDelete({_id: id, isAdmin: false});
        //response handle
        return successResponse(res, {
            statusCode: 200,
            message: 'User is deleted successfully',
        });
    } catch (error) {
        next(error);
    };

};

//register process
const processRegister = async(req, res, next)=>{
try {
    const {name, email, password, phone, address} = req.body

    const userExist = await User.exists({email: email});
    if(userExist) { next(createError(409, 'User is already exists.'))};

    //create web token
    const token = createJsonWebToken({name, email, password, phone, address}, jwtActivationKey, '10m');

    //prepare email
    const emailData = {
        email,
        subject: 'Account Activation Email',
        html: `
        <h2>Hello ${name} !</h2>
        <p>Please click here to link <a href = '${clint_URL}/api/users/activate/${token} target = '_blank'>activate your account</a></p>
        `
    };
    //send email with nodemailer
    try {
       // await sendEmailWithNodeMail(emailData);
    } catch (Emailerror) {
        next(createError(500, 'Failed to send varification email'));
        return;
    }

    return successResponse(res, {
        statusCode: 200,
        message: `Please go to your ${email} for completing registration process`,
        payload: {token}
    })
} catch (error) {
    
}
}

const activateUserAccount = async (req, res, next)=>{
    try {
        const token = req.body.token;
        if(!token){
            errorResponse(res, {
                statusCode:404,
                message: 'Token is empty'
            });
        };
        //token verify
        const decoded = jwt.verify(token, jwtActivationKey);
        if(!decoded){
            errorResponse(res, {
                statusCode: 401,
                message: 'Unable to verify'
            })
        };
        console.log(decoded);
        const userExist = await User.exists({email: decoded.email});
        if(userExist) { next(createError(401, 'User is already exists. Please sign In'))};
        //user create
        await User.create(decoded);

        return successResponse(res, {
            statusCode: 201,
            message: `User is register successfully`,
        })
    } catch (error) {
        if(error.name === 'TokenExpiredError'){
            next(createError(401, 'Token has expired'))
        } else if(error.name === 'JsonWebTokenError'){
            next(createError(401, 'Invalid Token'));
        }else next(error.message);
    }
}
///export
module.exports = {getAllUser, getUserByID, deleteUserByID, processRegister, activateUserAccount};
