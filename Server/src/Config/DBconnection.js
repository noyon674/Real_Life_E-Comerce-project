//import files
const Mongoose = require('mongoose');
const { mongodbURL } = require('../secret');

//databse connection
const connectDB = async(options = {})=>{
    try {
        await Mongoose.connect(mongodbURL,options);
        console.log('MongoDB is Connected.');
        Mongoose.connection.on('Error', (err)=>{console.error('DB connection Error: ', err)});
    } catch (error) {
        console.error('could not connection DB: ', error);
    }
};

//export
module.exports = connectDB;