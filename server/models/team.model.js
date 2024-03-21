const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const playerSchema = new Schema({
  id: {
    type: String,
  },
  name: {
    type: String,
  },
  role: {
    type: String,
  },
  battingStyle: {
    type: String,
  },
  bowlingStyle: {
    type: String,
  },
  country: {
    type: String,
  },
  playerImg: {
    type: String,
  },
});

const TeamSchema = new Schema(
  {
    teamName: {
      type: String,
    },
    shortname: {
      type: String,
    },
    img: {
      type: String,
    },
    players: [playerSchema],
  },
  {
    versionKey: false,
    timestamps: true,
  }
);
const Teams = mongoose.model("team", TeamSchema);

module.exports = Teams;
