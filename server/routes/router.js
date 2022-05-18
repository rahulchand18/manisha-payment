const express = require("express");
const router = express.Router();
const User = require('../models/user')
const session = require("express-session");
const bcrypt = require("bcryptjs");
// var http = require("http");


const {
    loginGetController,
    loginPostController,
    registerGetController,
    registerPostController,
    editSaveController,
    profileEditController,
    logoutController,
    loggedinController,
    verifyController,
    upload,
    getUser,
    photoUpload,
    getImageController
} = require('../controllers/user.controller')

router.get('/',(req, res) => {
  
    
    if (req.session.user) {
        // res.render('loggedin', { user: req.session.user })
        res.send(req.session.user)
    }
    else {

        // res.render('index')
        // res.json({
        //     message:"Home Page"}
        //     )
        res.sendFile("/home/rahul18/Desktop/Mynew/login-register/client/src/index.html")

        // res.send("Home Page loaded successfully!!");
    }
});
router.get('/loggedin', loggedinController);
router.get('/register', registerGetController);


router.get('/login', loginGetController);

router.get('/loggedin/edit', profileEditController);

router.get('/logout', logoutController);
router.post('/upload',photoUpload);
//POST REQUESTS
router.post('/register', registerPostController);

router.post('/login', loginPostController)
router.patch('/loggedin/edit/save',upload.single('image'), editSaveController);
router.get('/user/verify/:id/:uniqueString', verifyController);
router.get('/image/:img',getImageController)
router.post('/getuser',getUser)
// router.post('/upload',uploadController)

module.exports = router;
