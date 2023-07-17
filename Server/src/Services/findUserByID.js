//import files
const createError = require('http-errors');
const mongoose = require('mongoose');

//find with id function
const findWithID = async(Model, id, option = {})=>{
    try {
        //receive the given id
        const item = await Model.findById(id);
        //find user by id
        if(!item) {
            throw createError(404, `${Model.modelName} does not exist with this ID.`)
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