// routes/admin.js

const express = require('express');
const router = express.Router();

// Route to render the dashboard view
router.get('/dashboard', (req, res) => {
    res.render('admin/dashboard');
});

module.exports = router;
