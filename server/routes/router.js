const express = require("express");
const router = express.Router();
const User = require("../models/user");
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
  getImageController,
} = require("../controllers/user.controller");
const mainController = require("../controllers/main-controller");

router.get("/", (req, res) => {
  if (req.session.user) {
    // res.render('loggedin', { user: req.session.user })
    res.send(req.session.user);
  } else {
    // res.render('index')
    // res.json({
    //     message:"Home Page"}
    //     )
    res.send("Welcome to backend");

    // res.send("Home Page loaded successfully!!");
  }
});
router.get("/loggedin", loggedinController);
router.get("/register", registerGetController);

router.get("/login", loginGetController);

router.get("/loggedin/edit", profileEditController);

router.get("/logout", logoutController);
router.post("/upload", photoUpload);
//POST REQUESTS
router.post("/register", registerPostController);

router.post("/login", loginPostController);
router.patch("/loggedin/edit/save", upload.single("image"), editSaveController);
router.get("/user/verify/:id/:uniqueString", verifyController);
router.get("/image/:img", getImageController);
router.post("/getuser", getUser);
router.get("/getAllSeries", mainController.getAllSeries);
router.post("/createMatch", mainController.createMatch);
router.put("/updateMatch/:id", mainController.updateMatch);
router.get("/getAllTournaments/:type/:email", mainController.getAllTournaments);
router.get(
  "/getTournamentByTournamentId/:tournamentId",
  mainController.getTournamentById
);
router.post("/createNewTournament", mainController.createNewTournament);
router.post("/joinTournament/:tournamentId", mainController.joinTournament);
router.get("/showAllRequests/:tournamentId", mainController.showAllRequests);
router.put(
  "/updateRequest/:tournamentId/:requestId/:accept",
  mainController.updateRequest
);
router.get("/getAllTeamInfo/", mainController.getAllTeamInfo);
router.put("/updateActiveStatus/:id", mainController.updateActiveStatus);
router.put("/updateCompleteStatus/:id", mainController.updateCompleteStatus);
router.get("/getPrediction/:matchId/:email", mainController.getPrediction);
router.get("/getPlayers/:matchId", mainController.getPlayers);
router.post("/createPrediction", mainController.createPrediction);
router.put("/updatePrediction", mainController.updatePrediction);
router.put("/calculate/:matchId", mainController.calculatePoints);
router.get("/getPointsTable/:matchId", mainController.getPointsTable);
router.get("/getAllPredictions/:matchId", mainController.getAllPredictions);
// router.post('/upload',uploadController)

module.exports = router;
