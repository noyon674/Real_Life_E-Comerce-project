//import files
const {body} = require('express-validator');

//registration validation
const validateUserRegistration = [
    body('name')
    .trim()
    .notEmpty()
    .withMessage('Name is Required')
    .isLength({min: 3, max: 21})
    .withMessage('Name should be at least 3-21 charecters long.'),

    body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is Required')
    .isEmail()
    .withMessage('Invalid email address'),

    body('password')
    .trim()
    .notEmpty()
    .withMessage('Password is Required')
    .isLength({min: 6})
    .withMessage('Password should be at least 6 charecters.')
    .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/)
    .withMessage('Password should contain at least one uppercase letter, one lowercase letter, one number, and one special character.'),

    body('address')
    .trim()
    .notEmpty()
    .withMessage('Address is Required')
    .isLength({min: 6})
    .withMessage('Address should be at least 6 charecters'),

    body('phone')
    .trim()
    .notEmpty()
    .withMessage('Phone is Required'),

    body('image')
    .optional()
    .isString()

];


//login validation


//export
module.exports = {validateUserRegistration}