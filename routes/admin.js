var express = require("express");
const verifyToken = require("../middleware/tokenValid.js");
const { editProfile, getUser, changePassword } = require("../controllers/auth.js"); // Menggabungkan semua import dari auth.js
var router = express.Router();

router.get('/', (req, res) => {
    res.redirect('/admin/dashboard');
  });
  
  router.get("/dashboard", verifyToken('admin'), async (req, res) => {
    const user = await getUser(req, res); 
    res.render("admin/dashboard",{  user });
  });
  
  module.exports = router;