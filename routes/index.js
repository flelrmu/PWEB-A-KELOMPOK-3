var express = require("express");
const { Login, Logout } = require("../controllers/auth.js");
const refreshToken = require("../controllers/refresh.js");
var router = express.Router();

router.post("/login", Login);
router.get("/login", function (req, res, next) {
  res.render("login");
});

router.delete("/logout", Logout);

router.get("/logout", (req, res) => {
  res.clearCookie("refreshToken");
  res.redirect("/login");
});

module.exports = router;
