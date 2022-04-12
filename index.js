const express = require('express');
const path = require('path');
const hbs = require('hbs');
const bcrypt = require("bcryptjs");

const alert = require("alert");

const salt = bcrypt.genSaltSync(10);

const app = express();
require('./db/conn');
const Register = require('./models/register')

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
app.get('/inhome', (req, res) => {
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

        const user = await Register.findOne({ email: email })
        if (user != null) {
            alert("User already Registered");
        }
        try {



            if (password === cpassword) {


                const hash = bcrypt.hashSync(password, salt);
                const registerUser = new Register({
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
        const user = await Register.findOne({ email: email })
        if (user == null) {
           alert("User not registered yet!!");
        }
        // console.log(user.password)
        // console.log( bcrypt.compareSync(password,user.password));

        if (bcrypt.compareSync(password, user.password)) {
            console.log("success")
            res.status(201).render('loggedin')
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

app.listen(3000, () => {
    console.log("Server started at port 3000");
})
