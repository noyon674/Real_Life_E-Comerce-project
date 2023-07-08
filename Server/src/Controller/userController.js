//import files
const createError = require('http-errors');
const User = require('../Models/userModel');

//find all user api
const getUsers = async (req, res, next)=>{
    try {
        //searching
        const search = req.query.search || '';
        //pagination, page related first page
        const page = Number(req.query.page) || 1;
        //showing limit in the one page
        const limit = Number(req.query.limit) || 1;

        //searching function work like this, case insencitive searching
        const searchRegExp = new RegExp('.*'+ search + '.*', 'i');

        //filter function:
        const filter = {
            //admin not allow to showing
            isAdmin: {$ne: true},
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
        //in the one page how many user is showing
        .limit(limit)
        //one page's users is not allow in to the other page.
        .skip((page-1)*limit);

        //how many users have after filtering 
        const count = await User.find(filter).countDocuments();

        //if user not found
        if(!users) throw createError(404, 'No users found.');
        //response
        res.status(200).send({
            //users
            users,
            //pagination
            pagination: {
                //total page according to filtered users and according to limit
                totalPage: Math.ceil(count / limit),
                //current page: first time it is 1
                currentPage: page,
                //when 
                previousPage: page - 1 > 0 ? page-1 : null,
                nextPage: page+1 <= Math.ceil(count/limit) ? page+1: null
            }
        })
    } catch (error) {
        
    }
};

module.exports = getUsers;
