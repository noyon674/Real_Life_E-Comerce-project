//import file
require('dotenv').config();

//collect from .env file
const serverPort = process.env.SERVER_PORT || 3002;
const mongodbURL = process.env.MongoDB_Atlas_URL || "mongodb://localhost:27017/ecommerceMERN";
const defaultImgaPath= '../Public/Images/Users/t1.png';

//export
module.exports =
{
    serverPort,
    mongodbURL,
    defaultImgaPath,
}