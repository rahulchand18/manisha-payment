const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PointsTableSchema = new Schema(
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
      type: Number,
    },
    matchWinner: {
      type: Number,
    },
    manOfTheMatch: {
      type: Number,
    },
    mostCatches: {
      type: Number,
    },
    mostRuns: {
      type: Number,
    },
    mostWickets: {
      type: Number,
    },
    mostSixes: {
      type: Number,
    },
    total: {
      type: Number,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);
const PointsTable = mongoose.model("points-table", PointsTableSchema);

module.exports = PointsTable;
