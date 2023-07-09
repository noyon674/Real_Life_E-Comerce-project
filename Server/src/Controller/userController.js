//import files
const createError = require('http-errors');
const User = require('../Models/userModel');
const { successResponse } = require('./responseController');
const mongoose = require('mongoose');
const { findWithID } = require('../Services/findUserByID');

//find all user api
const getUsers = async (req, res, next)=>{
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
const getOne = async (req, res, next)=>{
    try {
        const id = req.params.id;
        //find user by id some code hane another file into the services folder
        const user = await findWithID(id);
        //response
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
///export
module.exports = {getUsers, getOne};
