var express = require("express");
const verifyToken = require("../middleware/tokenValid.js");
const { editProfile, getUser, changePassword } = require("../controllers/auth.js"); // Menggabungkan semua import dari auth.js
var router = express.Router();
const users = require('../controllers/users.js');
const upload = require('../middleware/upload');
const { Daftar } = require("../models/pendaftaran.js");

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

router.get("/logout", (req, res) => {
  res.clearCookie("refreshToken");
  res.redirect("/login");
});

router.get("/profile/editprofil", verifyToken("mahasiswa"), async (req, res) => {
  const user = await getUser(req, res);
  res.render("mahasiswa/editprofil", { user });
});

router.post("/editprofil", verifyToken("mahasiswa"), async (req, res) => {
  await editProfile(req, res);
});

router.get("/daftar", verifyToken("mahasiswa"), users.getForm);

router.post('/daftar', verifyToken('mahasiswa'), upload.single('file'), users.sendForm);

router.get('/lihat/:idDaftar', verifyToken("mahasiswa"), users.getDaftar);

router.get("/editdaftar/:idDaftar", verifyToken("mahasiswa"), users.editForm);

router.post("/editdaftar/:idDaftar", verifyToken("mahasiswa"), upload.single('file'), users.editDaftar);

router.get("/riwayat", verifyToken("mahasiswa"), async function (req, res) {
  const user = await getUser(req, res);
  res.render("mahasiswa/riwayat", { user });
});

// Rute untuk detail riwayat
router.get("/detailRiwayat", verifyToken("mahasiswa"), async function (req, res) {
  const user = await getUser(req, res);
  res.render("mahasiswa/detailRiwayat", { user });
});

// Rute untuk jadwal
router.get("/jadwal", verifyToken("mahasiswa"), async function (req, res) {
  const user = await getUser(req, res);
  res.render("mahasiswa/jadwal", { user });
});

router.post('/submit-jadwal', verifyToken("mahasiswa"), users.submitJadwal);

// Rute untuk cari
router.get("/cari", verifyToken("mahasiswa"), async function (req, res) {
  const user = await getUser(req, res);
  res.render("mahasiswa/cari", { user });
});

module.exports = router;
