const express = require('express');
const path = require('path');
const hbs = require('hbs');
const bcrypt = require("bcryptjs");
const cron = require('node-cron');
const session = require("express-session");

const salt = bcrypt.genSaltSync(10);

const app = express();
require('./db/conn');
const User = require('./models/user')
// const Userverification = require('./models/verifiedUser')
const userInfo = require('./models/userInfo')

// const nodemailer = require('nodemailer')

// const {v4: uuidv4} = require('uuid')

const static_path = path.join(__dirname, './templates/static')
const template = path.join(__dirname, './templates/views')
const partials_path = path.join(__dirname, './templates/partials')
app.use(express.static(static_path));
app.set('view engine', 'hbs');
app.set('views', template);
hbs.registerPartials(partials_path)

app.use(express.json());
app.use(express.urlencoded({ extended: false }))
app.use(session({
    secret:"secret",
    resave: false,
    saveUninitialized: true
}))

app.get('/', (req, res) => {
    res.render('index')
});
app.get('/loggedin', (req, res) => {
    if(req.session.user){

        res.render('loggedin',{user:req.session.user});
    }
    else{
        res.render('login',{message:"You must login first!!"})
    }
});
app.get('/register', (req, res) => {
    res.render('register')
});


app.get('/login', (req, res) => {
    res.render('login')
});

app.get('/loggedin/edit',(req,res)=>{
    res.render('editProfile',{user:req.session.user});
})
app.get('/logout', (req, res) => {
    req.session.destroy((err)=>{
        if(err){
            console.log(err);
        }else{

            res.render('login',{messageSuccess:"User Logged out successfully!!"});
        }
    })
})

//POST REQUESTS
app.post('/register', async (req, res) => {
    try {
        // console.log(req.body.fullname)
        const password = req.body.password;
        const cpassword = req.body.conpassword;
        const email = req.body.email;

        const user = await User.findOne({ email: email })
        if (user != null) {
            // alert("User already Registered");
            res.render('register',{message:" User already registered!!"});
        }
    else{
        try {

        

            if (password === cpassword) {


                const hash = bcrypt.hashSync(password, salt);
                const registerUser = new User({
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    email: req.body.email,
                    phone: req.body.phone,
                    password: hash,
                    // confirmpassword: req.body.conpassword,
                })

                const registered = await registerUser.save();
                // alert('hello')
                res.status(201).render('login',{messageSuccess:"User Regstered Succesfully!!"})

            } else {
                res.render('login',{invalid:"Invalid Password"});
            }
        } catch (error) {
            console.log(error)

        }
    }
    } catch (error) {
        res.status(400).send(error)
    }

});

app.post('/login', async (req, res) => {
    // console.log('hello')
    try {
        const email = req.body.email;
        const password = req.body.password;
        // console.log(password);
        // console.log(email)
        const user = await User.findOne({ email: email })
        if (user == null) {
        //    alert("User not registered yet!!");
        res.render('login',{message:"User not registered!!"});
        }
        
        else if (bcrypt.compareSync(password, user.password)) {
            console.log("success")
            req.session.user= user;
            res.redirect('/loggedin');

           
        }
        else {
            
            res.render('login',{message:"Invalid Credientials!!"});
            // res.render('login');
            
        }

    } catch (error) {
        res.status(400).send(`Invalid ${error}`);
    }

})
app.post('/loggedin/edit/save',(req,res)=>{
    console.log(" Changes Saved");
    res.end();
})

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



app.listen(3000, () => {
    console.log("Server started at port 3000");
})
