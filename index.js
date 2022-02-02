const express = require('express');
const path = require('path');
const hbs = require('hbs')

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
        if (password === cpassword) {
            const registerUser = new Register({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                phone: req.body.phone,
                password: req.body.password,
                confirmpassword: req.body.conpassword,
            })
            const registered = await registerUser.save();
            res.status(201).render('index')
        } else {
            res.send('Password not matched')
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
        const useremail = await Register.findOne({ email:email })
       
        if(useremail.password==password){
            res.status(201).render('index')
        }        
        else{
            res.send('Invalid Credentials ok')
        }

    } catch (error) {
        res.status(400).send(`Invalid ${error}`);
    }

})

app.listen(3000)
