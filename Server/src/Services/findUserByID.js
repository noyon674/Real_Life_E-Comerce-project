//import
const User = require("../Models/userModel");
const createError = require('http-errors');
const mongoose = require('mongoose');

//
const findWithID = async(id)=>{
    try {
        //receive the given id
        const options = {password: 0};
        const item = await User.findById(id, options);
        
        //find user by id
        if(!item) {
            throw createError(404, 'Item does not exist with this ID.')
        };
        return item;

    } catch (error) {
         //if mongo id is not correct then handle the mongoose error
        if(error instanceof mongoose.Error){
            throw createError(400, 'Invalid Item ID.');
        }
        throw error;
    }
};

module.exports = {findWithID};