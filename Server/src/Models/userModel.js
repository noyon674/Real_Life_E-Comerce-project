//import files
const Mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;

//create user schema
const userSchema = Mongoose.Schema({
    name: {
        type: String,
        require: [true, 'user name is required'],
        trim: true,
        maxlength: [21, 'The length of user name can be maximum 21 charecters'],
        minlength: [3, 'The length of user name can be minimum 3 charecters']
    },
    email: {
        type: String,
        require: [true, 'user email is required'],
        trim: true,
        unique: true,
        lowercase: true,
        validate: {
            validator: function(v){
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v)
            },
            message: 'Please enter a valid email'
        }
    },
    password: {
        type: String,
        require: [true, 'user password is required'],
        minlength: [6, 'The length of user name can be minimum 3 charecters'],
        set: (v)=>bcrypt.hashSync(v, saltRounds)
    },
    image: {
        type: Buffer,
        contentType: String,
        require: [true, 'User image is required.']
    },
    address: {
        type: String,
        require: [true, 'user address is required'],
        minlength: [6, 'Address must be at least 6 charecters'],
    },
    phone: {
        type: String,
        require: [true, 'user phone is required'],
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    isBanned: {
        type: Boolean,
        default: false
    },

}, {timestamps: true});

//create user model
const User = Mongoose.model('users', userSchema);

//export model
module.exports = User;