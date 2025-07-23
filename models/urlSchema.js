const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema(
  {
    shortId: {
      type: String,
      required: true,
      unique: true,
    },
    redirectUrl: {
      type: String,
      required: true,
    },
    visitHistory: [
      {
        date: {
          type: Date,
          default: Date.now,
        },
        ipAddress: {
          type: String,
          required: true,
        },
      },
    ],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const URL = mongoose.model("url", urlSchema);
module.exports = URL;
