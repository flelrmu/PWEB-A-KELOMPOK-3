var express = require("express");
const verifyToken = require("../middleware/tokenValid.js");
const { editProfile, getUser } = require("../controllers/auth.js");
var router = express.Router();

router.get("/", (req, res) => {
  res.redirect("/dosen/dashboard");
});

router.get("/dashboard", verifyToken("dosen"), async (req, res) => {
  const user = await getUser(req, res);
  res.render("dosen/dashboard", { user });
});

module.exports = router;
