const Users = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userCtrl = {
  register: async (req, res) => {
    try {
      const { name, email, password, metaaddress } = req.body;
      const user = await Users.findOne({ email, metaaddress });
      if (user)
        return res.status(400).json({ msg: "Credentials already exists" });
      if (password.length < 8)
        return res
          .status(400)
          .json({ msg: "Password should be atleast 8 characters" });

      //password encryption
      const passwordHash = await bcrypt.hash(password, 10);
      const newUser = new Users({
        name,
        email,
        password: passwordHash,
        metaaddress,
      });
      await newUser.save();

      //json web token
      const accesstoken = createAccessToken({ id: newUser._id });
      const refreshtoken = createRefreshToken({ id: newUser._id });

      //refresh token access api
      res.cookie("refreshtoken", refreshtoken, {
        httpOnly: true,
        pth: "/user/refresh_token",
      });

      res.json({ accesstoken });
      // res.status(200).json({ msg: "Successfully registered" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await Users.findOne({ email });
      if (!user) return res.status(400).json({ msg: "User does not exist" });

      const isMatched = await bcrypt.compare(password, user.password);
      if (!isMatched)
        return res.status(400).json({ msg: "Incorrect password" });

      //if logged in success fully then create access and refrash token
      const accesstoken = createAccessToken({ id: user._id });
      const refreshtoken = createRefreshToken({ id: user._id });

      //refresh token access api
      res.cookie("refreshtoken", refreshtoken, {
        httpOnly: true,
        path: "/user/refresh_token",
      });

      res.json({ accesstoken });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  logout: async (req, res) => {
    try {
      res.clearCookie("refreshtoken", { path: "/user/refresh_token" });
      return res.json({ msg: "Logged out" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  refreshToken: async (req, res) => {
    try {
      const rf_token = req.cookies.refreshtoken;
      if (!rf_token)
        return res.status(400).json({ msg: "Please Login or Register" });
      jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err)
          return res.status(400).json({ msg: "Please Login or Register" });
        const accesstoken = createAccessToken({ id: user.id });
        res.json({ accesstoken });
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getUser: async (req, res) => {
    try {
      const user = await Users.findById(req.user.id).select("-password");
      if (!user) return res.status(400).json({ msg: "Uers does not exist" });
      res.json(user);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

//access token for register/ login
const createAccessToken = (user) => {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1d" });
};

//refresh token
const createRefreshToken = (user) => {
  return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "2d" });
};

module.exports = userCtrl;
