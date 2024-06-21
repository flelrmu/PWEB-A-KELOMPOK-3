const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin');

router.get('/dashboard', adminController.dashboard);
router.get('/pendaftaran', adminController.pendaftaranSeminar);

router.get('/jadwal', (req, res) => {
    res.render('admin/jadwal');
});

router.get('/daftarhadir', (req, res) => {
    res.render('admin/daftarhadir');
});

module.exports = router;