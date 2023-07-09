//import files
const express = require('express');
const {getUsers, getOne} = require('../Controller/userController');
const userRouter = express.Router();

userRouter.get('/', getUsers);
userRouter.get('/:id', getOne);

module.exports = userRouter;