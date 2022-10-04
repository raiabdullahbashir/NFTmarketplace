const NFTs = require("../models/nftModel");
const multer = require("multer");

const storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null,'./uploads/');
    }
    filename: function (req, file, cb){
        cb(null, new Date().toISOString()+ file.originalname);
    }
})
const upload = multer({ storage: storage });

const nftCtrl = {
  createNft: async (req, res) => {
    try {
      const { title, description, price, royalties } = req.body;

      const newNft = new NFTs({
        title,
        description,
        price,
        royalties,
      });
      await newNft.save();

      res.status(200).json({ msg: "Successfully Created." });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};
module.exports = nftCtrl;
