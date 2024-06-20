const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin');

// Route to render the dashboard view with the registration count
router.get('/dashboard', adminController.dashboard);

// Other routes
router.get('/jadwal', (req, res) => {
    res.render('admin/jadwal');
});

router.get('/pendaftaran', (req, res) => {
    res.render('admin/pendaftaran');
});

router.get('/daftarhadir', (req, res) => {
    res.render('admin/daftarhadir');
});

module.exports = router;
