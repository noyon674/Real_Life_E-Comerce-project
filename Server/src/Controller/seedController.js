const User = require('../Models/userModel');
const data = require('../deta');

const seedUser = async(req, res, next)=>{
    try {
        //delete in all existig users
        await User.deleteMany({})

        //createing new user
        const users = await User.insertMany(data.users);

        //seccess response
        return res.status(201).json(users);
    } catch (error) {
        next(error);
    }
};

module.exports = {seedUser};