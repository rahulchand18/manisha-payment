const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const playerSchema = new Schema({
  playerName: {
    type: String,
  },
  email: {
    type: String,
  },
  status: {
    type: String,
    default: "pending",
  },
});

const TournamentSchema = new Schema(
  {
    name: {
      type: String,
    },
    tournamentId: {
      type: String,
    },
    tournamentAdmin: {
      type: String,
    },
    players: [playerSchema],
  },
  {
    versionKey: false,
    timestamps: true,
  }
);
const Tournament = mongoose.model("tournament", TournamentSchema);

module.exports = Tournament;
