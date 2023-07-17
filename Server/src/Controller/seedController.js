const User = require('../Models/userModel');
const data = require('../data');

//seed user controller
const seedUser = async(req, res, next)=>{
    try {
        //delete in all existig users
        await User.deleteMany({});

        //createing new user
        const users = await User.insertMany(data.users);

        //seccess response
        return res.status(201).json(users);
    } catch (error) {
        next(error);
    }
};

//export
module.exports = {seedUser};