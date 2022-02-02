const express = require('express');
const path = require('path');
const hbs = require('hbs')

const app = express();
require('./db/conn');

const static_path = path.join(__dirname, '../public')
const template = path.join(__dirname, './templates/views')
const partials_path = path.join(__dirname, './templates/partials')
app.use(express.static(static_path));
app.set('view engine','hbs');
app.set('views',template);
hbs.registerPartials(partials_path)

app.get('/', (req,res)=>{
    res.render('login')
});

app.listen(3000)
