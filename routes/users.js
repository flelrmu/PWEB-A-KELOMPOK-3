var express = require("express");
const verifyToken = require("../middleware/tokenValid.js");
const {
  editProfile,
  getUser,
  changePassword,
} = require("../controllers/auth.js");
var router = express.Router();
const users = require("../controllers/users.js");
const upload = require("../middleware/upload");
const { Daftar } = require("../models/pendaftaran.js");

router.get("/", (req, res) => {
  res.redirect("/login");
});

router.get("/home", verifyToken("mahasiswa"), async function (req, res) {
  const user = await getUser(req, res);
  res.render("mahasiswa/home", { user });
});

router.get("/profile", verifyToken("mahasiswa"), async function (req, res) {
  const user = await getUser(req, res);
  res.render("mahasiswa/profile", { user });
});

router.get(
  "/profile/ubahpassword",
  verifyToken("mahasiswa"),
  async function (req, res) {
    const user = await getUser(req, res);
    res.render("mahasiswa/ubahpassword", { user });
  }
);

router.post("/ubahpassword", verifyToken("mahasiswa"), async (req, res) => {
  await changePassword(req, res);
});

router.get("/logout", (req, res) => {
  res.clearCookie("refreshToken");
  res.redirect("/login");
});

router.get(
  "/profile/editprofil",
  verifyToken("mahasiswa"),
  async (req, res) => {
    const user = await getUser(req, res);
    res.render("mahasiswa/editprofil", { user });
  }
);

router.post("/editprofil", verifyToken("mahasiswa"), async (req, res) => {
  await editProfile(req, res);
});

router.get("/daftar", verifyToken("mahasiswa"), users.getForm);

router.post(
  "/daftar",
  verifyToken("mahasiswa"),
  upload.single("file"),
  users.sendForm
);

router.get("/lihat/:idDaftar", verifyToken("mahasiswa"), users.getDaftar);

router.get("/editdaftar/:idDaftar", verifyToken("mahasiswa"), users.editForm);

router.post(
  "/editdaftar/:idDaftar",
  verifyToken("mahasiswa"),
  upload.single("file"),
  users.editDaftar
);

// router.get("/riwayat", verifyToken("mahasiswa"), async function (req, res) {
//   const user = await getUser(req, res);
//   res.render("mahasiswa/riwayat", { user });
// });

// router.get("/detailRiwayat", users.getRiwayatSeminar, verifyToken("mahasiswa"), async function (req, res) {
//   const user = await getUser(req, res);
//   res.render("mahasiswa/detailRiwayat", { user });
// });

router.get(
  "/riwayat/:idDaftar",
  verifyToken("mahasiswa"),
  users.getRiwayatSeminar
);

router.get(
  "/detailRiwayat/:idDaftar",
  verifyToken("mahasiswa"),
  users.getDetailRiwayatSeminar
);

router.get("/jadwal", verifyToken("mahasiswa"), async function (req, res) {
  const user = await getUser(req, res);
  res.render("mahasiswa/jadwal", { user });
});

router.post("/submit-jadwal", verifyToken("mahasiswa"), users.submitJadwal);

router.get("/cari", verifyToken("mahasiswa"), users.searchSeminar);

module.exports = router;
