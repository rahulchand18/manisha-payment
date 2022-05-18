const express = require('express');
const path = require('path');
const hbs = require('hbs');
const bcrypt = require("bcryptjs");
const cron = require('node-cron');
const session = require("express-session");
const multer = require('multer')
const salt = bcrypt.genSaltSync(10);
const router = require('./routes/router');
const cors = require('cors');
const bodyParser = require('body-parser')
const app = express();
require('./db/conn');
// const User = require('./models/user');
// const { editSaveController } = require('./controllers/user.controller');
// const Uservevar http = require("http");


const static_path = path.join(__dirname, './templates/static')
const template = path.join(__dirname, './templates/views')
const partials_path = path.join(__dirname, './templates/partials')
app.use(express.static(static_path));
app.set('view engine', 'hbs');
app.set('views', template);
hbs.registerPartials(partials_path)
app.use(bodyParser.json())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("/home/rahul18/Desktop/Mynew/login-register/client/src/"));
app.use(session({
    secret: "secret",
    resave: false,
    saveUninitialized: true
}))
app.use(cors({origin:["http://localhost:4200"],credentials:true}));



//Setting UP Multer for image





app.use('',router)

// New Request

// app.get('/', (req, res) => {
//     if (req.session.user) {
//         res.render('loggedin', { user: req.session.user })
//     }
//     else {

//         res.render('index')
//     }
// });




//Cron Task

// cron.schedule('* * * * * *',()=>{
//     console.log("Running cron")
//     db.User.insertMany(userJson,(err)=>{
//         if(err){
//             console.log(err);
//         }
//         else{
//             console.log("Success");
//         }
//     })
// })



app.listen(3000,() => {
    console.log("Server started at port 3000");
})
