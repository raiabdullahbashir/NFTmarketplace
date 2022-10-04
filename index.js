require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors());

//Routes
app.use("/user", require("./routes/userRouter"));
app.use("/nft", require("./routes/nftRouter"));

//connect to mongodb
const URI = process.env.MONGODB_URL;
mongoose.connect(
  URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) throw err;
    console.log("Connected to MongoDB");
  }
);

app.get("/", (req, res) => {
  res.json({ msg: "1st api is working" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});
