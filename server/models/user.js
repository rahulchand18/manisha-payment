const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");
const usrSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    phone:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    verified: {
        type: Boolean,
        default: false
    },
    age: Number,
    about: String,
    dateOfBirth: Date,
    address:{
        street:String,
        city:String,
        state: String,

    },
    img: {
        type:String,
        default: "default.webp"
    }
})

const  User = new mongoose.model('User',usrSchema)

module.exports = User; 