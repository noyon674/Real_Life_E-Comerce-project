const express = require('express');
const getUsers = require('../Controller/userController');
const userRouter = express.Router();

userRouter.get('/', getUsers);

module.exports = userRouter;