const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const NotificationSchema = new Schema(
  {
    receiverId: {
      type: String,
    },
    message: {
      type: String,
    },
    sentDate: {
      type: Date,
    },
    url: {
      type: String,
    },
    seen: {
      type: Boolean,
      default: false,
    },
    deleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);
const notificationModel = mongoose.model("notification", NotificationSchema);

module.exports = notificationModel;
