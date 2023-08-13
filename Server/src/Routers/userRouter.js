//import files
const express = require('express');
const upload = require('../Middleware/uploadFile');
const { validateUserRegistration } = require('../Validators/auth');
const runValidation = require('../Validators');
const userRouter = express.Router();
const {
     getAllUser, 
     getUserByID, 
     deleteUserByID,
     processRegister, 
     activateUserAccount
} = require('../Controller/userController');


//all routes here
userRouter.post('/processRegister', validateUserRegistration, runValidation, upload.single('image'),processRegister); //register a user with image
userRouter.get('/', getAllUser); // get all users
userRouter.get('/:id', getUserByID);// get single user by id
userRouter.delete('/:id', deleteUserByID);// delete single user by id
userRouter.post('/verify', activateUserAccount);


//export routes
module.exports = userRouter;