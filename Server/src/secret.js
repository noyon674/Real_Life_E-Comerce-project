//import file
require('dotenv').config();

//collect from .env file
const serverPort = process.env.SERVER_PORT || 3002;
const mongodbURL = process.env.MongoDB_Atlas_URL || "mongodb://localhost:27017/ecommerceMERN";
const defaultImgaPath= '../Public/Images/Users/t1.png';
const jwtActivationKey = process.env.JWT_ACTIVATION_KEY || 'dkfaeJGEDWEUY874387@!$%';
const SMTPUserName = process.env.SMTP_userName
const SMTPPassword = process.env.SMPT_password;
const clint_URL = process.envclinkURL

//export
module.exports =
{
    serverPort,
    mongodbURL,
    defaultImgaPath,
    jwtActivationKey,
    SMTPUserName,
    SMTPPassword,
    clint_URL,
};