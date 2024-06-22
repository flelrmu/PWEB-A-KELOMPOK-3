var express = require("express");
var router = express.Router();

const adminController = require('../controllers/admin');
const verifyToken = require("../middleware/tokenvalid.js");
const {
  editProfile,
  getUser,
  changePassword,
} = require("../controllers/auth.js");

router.get('/dashboard', adminController.dashboard);
router.get('/pendaftaran', adminController.pendaftaranSeminar);
router.get('/jadwal', (req, res) => {
    res.render('admin/jadwal');
});

router.get('/daftarhadir', (req, res) => {
    res.render('admin/daftarhadir');
});

router.get("/", (req, res) => {
  res.redirect("/admin/dashboard");
});

router.get("/dashboard", verifyToken("admin"), async (req, res) => {
  const user = await getUser(req, res);
  res.render("admin/dashboard", { user });
});
router.delete('/pendaftaran/:id', adminController.deletePendaftaran);

module.exports = router;
