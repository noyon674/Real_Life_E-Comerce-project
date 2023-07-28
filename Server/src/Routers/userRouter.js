//import files
const express = require('express');
const {getAllUser, getUserByID, deleteUserByID,
     processRegister, activateUserAccount} = require('../Controller/userController');
const upload = require('../Middleware/uploadFile');
const userRouter = express.Router();

//all routes here
userRouter.post('/processRegister', upload.single('image'), processRegister); //register a user with image
userRouter.get('/', getAllUser); // get all users
userRouter.get('/:id', getUserByID);// get single user by id
userRouter.delete('/:id', deleteUserByID);// delete single user by id
userRouter.post('/verify', activateUserAccount);


//export routes
module.exports = userRouter;