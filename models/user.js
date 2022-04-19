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
    verified: Boolean
})

const  User = new mongoose.model('User',usrSchema)

module.exports = User; 