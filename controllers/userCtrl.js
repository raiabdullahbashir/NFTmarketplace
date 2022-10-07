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
      const access_token = createAccessToken({ id: newUser._id });
      // const refresh_token = createRefreshToken({ id: newUser._id });
      // //refresh token access api
      // res.cookie("refresh_token", refresh_token, {
      //   httpOnly: true,
      //   path: "/user/refresh_token",
      //   maxAge: 1 * 24 * 60 * 60 * 1000, // 7 days
      // });

      res.json({ access_token });
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
      console.log("in login api");
      const isMatched = await bcrypt.compare(password, user.password);
      if (!isMatched)
        return res.status(400).json({ msg: "Incorrect password" });

      //if logged in success fully then create access and refrash token
      const access_token = createAccessToken({ id: user._id });
      const refresh_token = createRefreshToken({ id: user._id });
      console.log("refresh_token in login: " + refresh_token);

      //refresh token access api
      res.cookie("refresh_token", refresh_token, {
        httpOnly: true,
        path: "/user/refresh_token",
        maxAge: 1 * 24 * 60 * 60 * 1000, // 7 days
      });

      res.json({ access_token });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  logout: async (req, res) => {
    try {
      res.clearCookie("refresh_token", { path: "/user/refresh_token" });
      return res.json({ msg: "Logged out" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  refreshToken: (req, res) => {
    try {
      const rf_token = req.cookies.refresh_token;
      // console.log("refresh_token in refreshToken: " + rf_token);

      if (!rf_token)
        return res
          .status(400)
          .json({ msg: "rf_token______Please Login or Register" });
      jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err)
          return res
            .status(400)
            .json({ msg: "in err Please Login or Register" });
        const access_token = createAccessToken({ id: user.id });
        // console.log("access_token" + access_token);
        res.json({ access_token });
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
