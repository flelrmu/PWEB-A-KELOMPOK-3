var express = require('express');
var router = express.Router();

/* GET change password page. */
router.get('/ubah', function(req, res, next) {
  res.render('ubahpassword');
});

module.exports = router;
