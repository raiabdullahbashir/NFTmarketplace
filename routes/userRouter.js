const router = require("express").Router();
const userCtrl = require("../controllers/userCtrl");
const auth = require("../middlewares/auth");
router.post("/register", userCtrl.register);
router.get("/refresh_token", userCtrl.refreshToken);
router.post("/login", userCtrl.login);
router.get("/logout", userCtrl.logout);
router.get("/info", auth, userCtrl.getUser);
module.exports = router;
