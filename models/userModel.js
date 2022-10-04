const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    metaaddress: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
      type: String,
      required: true,
      default: "client",
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Users", userSchema);
