//import files
const express = require('express');
const Morgan = require('morgan');
const createError = require('http-errors');
const xssClean = require('xss-clean');
const expressLimit = require('express-rate-limit');
const userRouter = require('./Routers/userRouter');// user router
const seedRouter = require('./Routers/seedRouter');// seed router
const { errorResponse } = require('./Controller/responseController'); //response handler

//create express app
const app = express();

//create rate limiter
const rateLimit = expressLimit({
    windowMs: 60 * 1000,//set 1 min 1000ms == 1s
    max: 5,
    Massege: 'Too many request from this IP, please try again.',
});

//third party middleware
app.use(xssClean());
app.use(rateLimit);
app.use(Morgan('dev'));
app.use(express.json());//Built in middleware for changing body 
app.use(express.urlencoded({extended: true}));

//All routes here
app.use('/api/users', userRouter);// users route
app.use('/api/seed', seedRouter);//seed users route

//Home Route
app.get('/', (req, res)=>{
    res.status(200).json({
        Message: 'Welcome to Home Route.'
    });
});

//// client handling middleware
app.use((req, res, next)=>{
    //http error
    next(createError(404, 'Route not found client site.')); 
});

//server error checking --> all the errors caome here
app.use((err, req, res, next)=>{
    return errorResponse(res, {
        statusCode: err.status,
        message: err.message
    });
});

//export the 'app' module
module.exports = app;