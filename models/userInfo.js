const mongoose = require('mongoose');

const infoSchema = new mongoose.Schema({
    Age: Number,
    Bio: String,
    DOB: Date,
    Address:{
        street:String,
        City:String,
        State: String,

    },
    img: {
        data: Buffer,
        contentType: String
    }
})

const  userInfo = new mongoose.model('userInfo',infoSchema)

module.exports = userInfo; 