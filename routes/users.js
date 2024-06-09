var express = require("express");
const verifyToken = require("../middleware/tokenValid.js");
const { editProfile, getUser, changePassword } = require("../controllers/auth.js"); // Menggabungkan semua import dari auth.js
var router = express.Router();

// Rute untuk redirect ke login jika mengakses root
router.get("/", (req, res) => {
  res.redirect("/login");
});

// Rute untuk halaman home, dilindungi oleh middleware verifyToken
router.get("/home", verifyToken("mahasiswa"), async function (req, res) {
  const user = await getUser(req, res);
  res.render("mahasiswa/home", { user });
});

// Rute untuk halaman profile, dilindungi oleh middleware verifyToken
router.get("/profile", verifyToken("mahasiswa"), async function (req, res) {
  const user = await getUser(req, res);
  res.render("mahasiswa/profile", { user });
});

// Rute untuk halaman ubah password, dilindungi oleh middleware verifyToken
router.get("/profile/ubahpassword", verifyToken("mahasiswa"), async function (req, res) {
  const user = await getUser(req, res);
  res.render("mahasiswa/ubahpassword", { user });
});

// Rute untuk mengubah password, dilindungi oleh middleware verifyToken
router.post("/ubahpassword", verifyToken("mahasiswa"), async (req, res) => {
  await changePassword(req, res);
});

// Rute untuk logout
router.get("/logout", (req, res) => {
  res.clearCookie("refreshToken");
  res.redirect("/login");
});

// Rute untuk halaman edit profil, dilindungi oleh middleware verifyToken
router.get("/profile/editprofil", verifyToken("mahasiswa"), async (req, res) => {
  const user = await getUser(req, res);
  res.render("mahasiswa/editprofil", { user });
});

// Rute untuk mengedit profil, dilindungi oleh middleware verifyToken
router.post("/editprofil", verifyToken("mahasiswa"), async (req, res) => {
  await editProfile(req, res);
});

router.get("/daftar", verifyToken("mahasiswa"), async function (req, res) {
  const user = await getUser(req, res);
  res.render("mahasiswa/daftar", { user });
});

router.get("/lihat", verifyToken("mahasiswa"), async function (req, res) {
  const user = await getUser(req, res);
  res.render("mahasiswa/lihat", { user });
});

router.get("/editdaftar", verifyToken("mahasiswa"), async function (req, res) {
  const user = await getUser(req, res);
  res.render("mahasiswa/editdaftar", { user });
});


module.exports = router;
