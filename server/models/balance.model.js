const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BalanceSchema = new Schema(
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
    month: {
      type: String,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);
const BalanceModel = mongoose.model("balance", BalanceSchema);

module.exports = BalanceModel;
