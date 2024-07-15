const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StatementSchema = new Schema(
  {
    email: {
      type: String,
    },
    fullName: {
      type: String,
    },
    balance: {
      type: Number,
    },
    action: {
      type: String,
    },
    date: {
      type: Date,
    },
    month: {
      type: String,
    },
    remarks: {
      type: String,
      default: "admin",
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);
const StatementModel = mongoose.model("statement", StatementSchema);

module.exports = StatementModel;
