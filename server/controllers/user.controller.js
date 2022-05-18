const User = require("../models/user");
const bcrypt = require("bcryptjs");
const session = require("express-session");
const multer = require("multer");
const nodemailer = require("nodemailer");
const VerifiedUser = require("../models/verifiedUser")

const { v4: uuidv4 } = require("uuid");
// const User = require("../models/user");

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "myloginapp18@gmail.com",
    pass: "javra@123",
  },
});

const  sendEmail = async ({_id,email},res) => {

  const currentUrl = 'http://localhost:3000/';
  const uniqueString = uuidv4() + _id;

  const mailOptions ={
    from: 'myloginapp18@gmail.com',
    to: email,
    subject: "Verification",
    html: `<p>Verify Your email addresss to complete signup process.</p> <p><b>Click <a href =${currentUrl+'user/verify/'+ _id + '/' + uniqueString}> here</p><p> to verify your email</b></p>`,

  }
  ///
  const salt = bcrypt.genSaltSync(10);
  const hashStr = bcrypt.hashSync(uniqueString, salt);
  const verifiedUser = new VerifiedUser({
    userId : _id,
    uniqueString: hashStr,
    createdAt: Date.now(),
    expiresAt: Date.now() + 21600000,
  });
  try{
    const saved = await verifiedUser.save()
    const sendMail = await transporter.sendMail(mailOptions)
    res.json({
      status:"Pending",
      message: `Verification mail sent to ${email}`
    })
  }catch(e){
    console.log(e)
    res.status(500).send(e);
  }
  
  
}

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./media/uploads");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + "." + file.originalname.split(".")[1]
    );
  },
});
// const upload = multer({ storage: storage });

loginGetController = (req, res) => {
  // res.render("login");
  res.send("This is login page")
};
verifyController = async (req,res) =>{
  try{

  
  const {id, uniqueString} = req.params;
  const vUser = await VerifiedUser.findOne({userId: id})
  if(bcrypt.compareSync(uniqueString, vUser.uniqueString)){
  const u = await User.findOne({_id:id});
  if(u.verified){
    console.log(u.verified)
    res.send("User Already verified")
  }  

    const userVerified = await User.findOneAndUpdate({_id:id},{verified:true},{
      new : true
    })
    // console.log(id,uniqueString)
    const deleted = await VerifiedUser.findOneAndDelete({userId:id})
    res.status(200).json(userVerified)
  }else{
    res.status(400).send('Verification failed');
  }
}catch(e){
  res.send(e)
}
}

loginPostController = async (req, res) => {
  console.log(req.body);

  try {
    const email = req.body.email;
    const password = req.body.password;

    //  console.log(req.body.email);
    const user = await User.findOne({ email: email });
    if (user == null) {
      console.log("User not registered");

      // res.render("login", { message: "User not registered!!" });
      res.send({message:"User Not Registered",
      validUser: false})
    } else if (bcrypt.compareSync(password, user.password)) {
      req.session.user = user;
      console.log("Hello"+req.session.user);
      res.send({user:req.session.user,
        validUser: true
      });
      // res.redirect("/loggedin");
    } else {
      // res.render("login", { message: "Invalid Credientials!!" });
      res.json({
        message:"Invalid Credentials",
        validUser: false 
      }
        )
      // res.render('login');
    }
  } catch (error) {
    res.status(400).send(`Invalid ${error}`);
  }
};
profileEditController = (req, res) => {
  if (req.session.user) {
    // res.render("editProfile", { user: req.session.user });
    res.json({
      message:"Edit Profile"}
      )
  } else {
    // res.render("login", { message: "You must login first!!" });
    res.json({
      message:"Login required"}
      )
  }
};

const salt = bcrypt.genSaltSync(10);
registerGetController = (req, res) => {
  // res.render("register");
  res.json({
    message:"Register Page"}
    )
  console.log("register-get");
};
registerPostController = async (req, res) => {
  try {
    const password = req.body.password;
    const cpassword = req.body.conpassword;
    const email = req.body.email;

    const user = await User.findOne({ email: email });
    if (user != null) {
      // alert("New RequestUser already Registered");
      // res.render("register", { message: " User already registered!!" });
      res.json({
        message:"User Already Registered"}
        )
      console.log("register-post");
    } else {
      try {
        if (password === cpassword) {
          const hash = bcrypt.hashSync(password, salt);
          const registerUser = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            phone: req.body.phone,
            password: hash,
            address:{
              street:'',
              city:'',
              state:''
            },
            about:''
           
          });

          const registered = await registerUser.save();
          // alert('hello')
          console.log(registered);
          // res.status(201).render("login", {
          //   messageSuccess: "User Regstered Succesfully!!",
          // });
          // res.status(201).send(registered)
          sendEmail(registered,res);
        } else {
          res.status.send({
            status:"Bad Request",
            message:"Passwords do not match"
          });
          // res.render("register", { message: "Passwords did not match" });
        }
      } catch (error) {
        console.log(error);
      }
    }
  } catch (error) {
    res.status(400).send(error);
  }
};
editSaveController = async (req, res) => {
  const bodyData=req.body;
  const newData= bodyData;
  console.log(req.file)
 if(req.file){

   const imgData= {img: req.file.filename};
   
   const newData= Object.assign(bodyData,imgData)
  }
  try {
    let user = req.session.user;
    if (user) {
      
      const editUser = await User.findOneAndUpdate(
        { email: user.email },
        newData,
        {
          new: true,
        }
      );

      // console.log(req.body)
      res.status(200).send(editUser);
    } else {
      res.json({
        message:"Login required"}
        )
    }
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }

  
};

logoutController = (req, res) => {
  if (req.session.user) {
    req.session.destroy((err) => {
      if (err) {
        console.log(err);
      } else {
        // res.render("login", {
        //   messageSuccess: "User Logged out successfully!!",
        // });
        console.log('logout Success')
        res.json({
      message:"Logout Successful"}
      )
      }
    });
  } else {
    // res.render("login", { message: "You must login first!!" });
    res.json({
      message:"Login required"}
      )
  }
};
loggedinController = async (req, res) => {
  if (req.session.user) {
    req.session.user = await User.findOne({ email: req.session.user.email });
      console.log(req.session.user)
    // res.render("loggedin", { user: req.session.user });
    res.send({user:req.session.user,isLoggedIn:true})
  } else {
    console.log("No user")
    // res.render("login", { message: "You must login first!!" });
    res.json({
      message:"Login required",
      isLoggedIn:false}
      )
  }
};
 getUser = async(req,res)=>{
  try{
    // res.send(req.body.email)
    const email = req.body.email;
    console.log(email)
    const user = await User.findOne({email: email})

    if(user)
    {

      res.json(user)
    }
    else{
      res.json({message:"No User"})
    }
  }catch(e){
    res.send(e);
  }
}
photoUpload = (req,res)=>{
  res.send(req.file.filename)
  
}
getImageController = (req,res)=>{
  const img=req.params.img;
  res.sendFile(`/home/rahul18/Desktop/Mynew/login-register/server/media/uploads/${img}`)
}

const upload = multer({ storage: storage });

module.exports = {
  registerGetController,
  registerPostController,
  loginGetController,
  loginPostController,
  profileEditController,
  editSaveController,
  logoutController,
  loggedinController,
  verifyController,
  upload,
  getUser,
  photoUpload,
  getImageController
};



// {
//   firstName:req.body.firstName,
//   lastName:req.body.lastName,
//   email:req.body.email,
//   phone:req.body.phone,
//   age:req.body.age,
//   about:req.body.about,
//   img:req.file.filename,
//   dateOfBirth:req.body.dateOfBirth,
//   address:req.body.address
// },