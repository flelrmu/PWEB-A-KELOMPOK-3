// routes/admin.js

const express = require('express');
const router = express.Router();

// Route to render the dashboard view
router.get('/dashboard', (req, res) => {
    res.render('admin/dashboard');
});

// Route to render the jadwal view
router.get('/jadwal', (req, res) => {
    res.render('admin/jadwal');
});

// Route to render the pendaftaran view
router.get('/pendaftaran', (req, res) => {
    res.render('admin/pendaftaran');
});

// Route to render the pendaftaran view
router.get('/daftarhadir', (req, res) => {
    res.render('admin/daftarhadir');
});

module.exports = router;
