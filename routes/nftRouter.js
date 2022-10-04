const router = require("express").Router();
const NFTs = require("../models/nftModel");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post("/createNft", upload.single("nftImage"), async (req, res) => {
  try {
    const { title, description, price } = req.body;
    console.log("file: " + req.file);
    const nftImage = req.file.filename;
    const newNft = new NFTs({
      title,
      description,
      price,
      nftImage,
    });
    await newNft.save();

    res.status(200).json({ msg: "Successfully Created." });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
});
module.exports = router;
