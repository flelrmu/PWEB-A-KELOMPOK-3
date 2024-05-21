var express = require('express');
const verifyToken = require('../middleware/tokenvalid.js');
const { editProfile, getUser } = require('../controllers/auth.js');
const { changePassword } = require('../controllers/auth.js');
var router = express.Router();

router.get('/', (req, res) => {
  res.redirect('/login'); 
});

router.get("/home", verifyToken('mahasiswa'), async function (req, res) {
  const user = await getUser(req, res); 
  res.render("mahasiswa/home", { user });
});


router.get("/profile", verifyToken('mahasiswa'), async function (req, res) {
const user = await getUser(req, res); 
res.render("mahasiswa/profile", { user });
});



router.get('/profile/ubahpassword',verifyToken('mahasiswa'), async function (req, res) {
const user = await getUser(req, res); 
res.render('mahasiswa/ubahpassword', { user });
});

router.post('/ubahpassword', verifyToken('mahasiswa'), async (req, res) => {
await changePassword(req, res);
});


router.get('/logout', (req, res) => {
res.clearCookie('refreshToken');
res.redirect('/login');
});

router.post('/ubahpassword', verifyToken, async (req, res) => {
await changePassword(req, res);
});

router.get('/profile/editprofil',verifyToken('mahasiswa'), async (req, res) => {
const user = await getUser(req, res); 
res.render('mahasiswa/editprofil', { user });
});

router.post('/editprofil', verifyToken('mahasiswa'), async (req, res) => {
await editProfile(req, res);
});

module.exports = router;
