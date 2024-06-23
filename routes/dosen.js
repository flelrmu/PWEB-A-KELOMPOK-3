var express = require("express");
const verifyToken = require("../middleware/tokenvalid.js");
const { editProfile, getUser } = require("../controllers/auth.js");
const {Pendaftar} = require('../models/datadaftar');
var router = express.Router();

router.get('/', (req, res) => {
    res.redirect('/dosen/dashboard');
  });
  
  router.get("/dashboard", verifyToken('dosen'), async (req, res) => {
    const user = await getUser(req, res); 
    res.render("dosen/dashboard",{  user });
  });
  
  router.get("/SemHas", verifyToken('dosen'), async (req, res) => {
    const user = await getUser(req, res); 
    res.render("dosen/SemHas",{  user });
  });

  router.get("/daftarhadir", verifyToken('dosen'), async (req, res) => {
    const user = await getUser(req, res); 
    res.render("dosen/daftarhadir",{  user });
  });
  module.exports = router;
