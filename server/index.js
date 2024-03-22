const express = require("express");
const path = require("path");
const hbs = require("hbs");
const bcrypt = require("bcryptjs");
const cron = require("node-cron");
const session = require("express-session");
const multer = require("multer");
const salt = bcrypt.genSaltSync(10);
const router = require("./routes/router");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const mongooseConnect = require("./db/conn");
const morgan = require("morgan");
// const User = require('./models/user');
// const { editSaveController } = require('./controllers/user.controller');
// const Uservevar http = require("http");

const static_path = path.join(__dirname, "./templates/static");
const template = path.join(__dirname, "./templates/views");
const partials_path = path.join(__dirname, "./templates/partials");
app.use(express.static(static_path));
app.set("view engine", "hbs");
app.set("views", template);
hbs.registerPartials(partials_path);
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(
  cors({
    origin: true,
    credentials: true,
    exposedHeaders: ["Access-Control-Allow-Origin"], // This will expose the header to the client
  })
);
app.use((req, res, next) => {
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.status(200).send();
  } else {
    next();
  }
});

//Setting UP Multer for image
app.use(morgan(":method :url :status :response-time"));

app.use("", router);

console.log("Connecting To Database...");
mongooseConnect().then(() => {
  app.listen(3000, () => {
    console.log("Server started at port 3000");
  });
});
