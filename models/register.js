const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");
const regSchema = new mongoose.Schema({
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
    }
})
// regSchema.pre('save',(next)=>{
//     if(this.isModified('password')){
//         bcrypt.hash(this.password, 10,(err,hash)=>{
//             if(err) return next(err);
//             this.password = hash;
//             next();
//         })
//     }
// })

// regSchema.methods.comparePassword = async function(password) {
//     if(!password) throw new Error("Password is missing");
//     try {
//         const result = await bcrypt.compare(password,this.password)
//         return result;
//     } catch (error) {
//         console.log(error)
//     }

// }

const  Register = new mongoose.model('Register',regSchema)

module.exports = Register; 