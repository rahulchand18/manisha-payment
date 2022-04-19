const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");
const usrVerifySchema = new mongoose.Schema({
    userId: String,
    uniqueString: String,
    createdAt : Date,
    expiresAt : Date
})

const  Userverify = new mongoose.model('Userverify',usrVerifySchema)

module.exports = Userverify; 