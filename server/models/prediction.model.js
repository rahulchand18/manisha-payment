const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PredictionSchema = new Schema(
  {
    matchId: {
      type: String,
    },
    date: {
      type: String,
    },
    email: {
      type: String,
    },
    tossWinner: {
      type: String,
    },
    matchWinner: {
      type: String,
    },
    manOfTheMatch: {
      type: String,
    },
    mostCatches: {
      type: String,
    },
    mostRuns: {
      type: String,
    },
    mostWickets: {
      type: String,
    },
    mostSixes: {
      type: String,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);
const PredictionModel = mongoose.model("prediction", PredictionSchema);

module.exports = PredictionModel;
