const express = require('express');
const path = require('path');
const hbs = require('hbs');
const bcrypt = require("bcryptjs");
const cron = require('node-cron');
// const userJson = require('../Users.json')

const alert = require("alert");

const salt = bcrypt.genSaltSync(10);

const app = express();
require('./db/conn');
const User = require('./models/user')
const Userverification = require('./models/verifiedUser')

const nodemailer = require('nodemailer')

// const {v4: uuidv4} = require('uuid')

const static_path = path.join(__dirname, '../public')
const template = path.join(__dirname, './templates/views')
const partials_path = path.join(__dirname, './templates/partials')
app.use(express.static(static_path));
app.set('view engine', 'hbs');
app.set('views', template);
hbs.registerPartials(partials_path)

app.use(express.json());
app.use(express.urlencoded({ extended: false }))

app.get('/', (req, res) => {
    res.render('index')
});
app.get('/profile', (req, res) => {
    res.render('loggedin')
});
app.get('/register', (req, res) => {
    res.render('register')
});


app.get('/login', (req, res) => {
    res.render('login')
});

app.post('/register', async (req, res) => {
    try {
        // console.log(req.body.fullname)
        const password = req.body.password;
        const cpassword = req.body.conpassword;
        const email = req.body.email;

        const user = await User.findOne({ email: email })
        if (user != null) {
            alert("User already Registered");
        }
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
                res.status(201).render('login')

            } else {
                alert('Password not matched')
            }
        } catch (error) {
            console.log(error)

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
           alert("User not registered yet!!");
        }
        // console.log(user.password)
        // console.log( bcrypt.compareSync(password,user.password));

        if (bcrypt.compareSync(password, user.password)) {
            console.log("success")
            res.status(201).render('loggedin',{
                fullName: user.firstName +" "+ user.lastName,
                firstName: user.firstName,
                email: user.email,
                pno: user.phone

            })
        }
        else {
            // res.send('Invalid Credentials')
            alert('Invalid Credentials');
            res.render('login');
            
        }

    } catch (error) {
        res.status(400).send(`Invalid ${error}`);
    }

})
app.get('/logout', (req, res) => {
    res.render('login');
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
