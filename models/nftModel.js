const mongoose = require("mongoose");
const nftSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: String,
      required: true,
      trim: true,
    },
    nftImage: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("NFTs", nftSchema);
