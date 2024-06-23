const express = require("express");
const router = express.Router();

const adminController = require('../controllers/admin');
const verifyToken = require("../middleware/tokenvalid.js");

router.get('/dashboard', verifyToken("admin"), adminController.dashboard);
router.get('/pendaftaran', verifyToken("admin"), adminController.pendaftaranSeminar);
router.get('/jadwal', verifyToken("admin"), (req, res) => {
  const days = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
  res.render('admin/jadwal', { days });
});
router.post('/saveJadwal', verifyToken("admin"), adminController.saveJadwal);
router.get('/daftarhadir', verifyToken("admin"), (req, res) => {
    res.render('admin/daftarhadir');
});

router.get("/", verifyToken("admin"), (req, res) => {
  res.redirect("/admin/dashboard");
});

router.delete('/pendaftaran/:id', verifyToken("admin"), adminController.deletePendaftaran);

module.exports = router;
