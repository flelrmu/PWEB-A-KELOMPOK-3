var express = require("express");
const { Login, Logout } = require("../controllers/auth.js");
const { refreshToken } = require("../controllers/refresh.js");
var router = express.Router();

// Menggunakan fungsi Login dari controllers/auth.js untuk mengotentikasi pengguna
router.post("/login", async (req, res, next) => {
  try {
    await Login(req, res, next);
  } catch (error) {
    next(error);
  }
});

// Menangani permintaan GET ke /login dan merender halaman login
router.get("/login", function (req, res, next) {
  res.render("login");
});

// Menggunakan fungsi Logout dari controllers/auth.js untuk menghapus sesi pengguna
router.post("/logout", async (req, res, next) => {
  try {
    await Logout(req, res, next);
  } catch (error) {
    next(error);
  }
});

// Menangani permintaan GET ke /logout dan merender halaman login
router.get("/logout", (req, res) => {
  res.clearCookie("refreshToken");
  res.redirect("/login");
});

module.exports = router;
