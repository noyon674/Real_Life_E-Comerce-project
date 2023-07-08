const express = require('express');
const Morgan = require('morgan');
const bodyParser = require('body-parser');//third party middleware
const createError = require('http-errors');
const xssClean = require('xss-clean');
const expressLimit = require('express-rate-limit');
const userRouter = require('./Routers/userRouter');
const seedRouter = require('./Routers/seedRouter');
const app = express();

//create rate limiter
const rateLimit = expressLimit({
    windowMs: 1 * 60 * 1000,//set 1 min
    max: 5,
    Massege: 'Too many request from this IP, please try again.',
});

//third party middleware
app.use(xssClean());
app.use(rateLimit);
app.use(Morgan('dev'));
app.use(bodyParser.json());//Built in middleware for changing body 
app.use(bodyParser.urlencoded({extended: true}));

/////user router use
app.use('/api/users',userRouter);
//seed api
app.use('/api/seed', seedRouter);

//rate limit check
app.get('/limit', (req, res)=>{
    res.status(200).json({Message: 'I am your rate checking route.'});
});


//routes
app.get('/about', (req, res)=>{
    res.status(200).json({Message: 'I am your about route.'});
});
app.get('/contact', (req, res)=>{
    res.status(200).json({Message: 'I am your contact route.'});
});

//express error handling middleware
//// client handling middleware
app.use((req, res, next)=>{
    //http error
    next(createError(404, 'Route not found client site.')); 
});

//server error checking --> all the errors caome here
app.use((err, req, res, next)=>{
    return res.status(err.status || 500).json({
        Success: false,
        Messege: err.message
    });
});

//export the 'app' module
module.exports = app;