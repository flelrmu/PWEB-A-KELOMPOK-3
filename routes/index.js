var express = require("express");
const { Login, Logout } = require("../controllers/auth.js");
const { refreshToken } = require("../controllers/refresh.js");
var router = express.Router();

router.post("/login", async (req, res, next) => {
  try {
    await Login(req, res, next);
  } catch (error) {
    next(error);
  }
});

router.get("/login", function (req, res, next) {
  res.render("login");
});

router.post("/logout", async (req, res, next) => {
  try {
    await Logout(req, res, next);
  } catch (error) {
    next(error);
  }
});

router.get("/logout", (req, res) => {
  res.clearCookie("refreshToken");
  res.redirect("/login");
});

module.exports = router;
