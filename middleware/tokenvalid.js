const jwt = require('jsonwebtoken');

function verifyToken(role) {
    return function (req, res, next) {
      const accessToken = req.cookies.token;
      const refreshToken = req.cookies.refreshToken;
  
      if (!refreshToken) {
        console.log("Tidak ada token baru yang ditemukan, mengalihkan ke login");
        return res.redirect('/');
      }
  
      if (!accessToken) {
        console.log("Tidak ada token akses yang ditemukan, dialihkan ke login");
        return res.redirect('/');
      }
  
      jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
          if (err.name === 'TokenExpiredError') {
            console.log("Token akses kedaluwarsa, memverifikasi token baru");
  
            jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decodedRefresh) => {
              if (err) {
                console.log("Verifikasi token gagal:", err);
                return res.redirect('/');
              }
  
              const newAccessToken = jwt.sign({ userId: decodedRefresh.userId, role: decodedRefresh.role }, process.env.ACCESS_TOKEN_SECRET, {
                expiresIn: '15m'
              });
  
              console.log("Token baru dibuat:", newAccessToken);
  
              res.cookie('token', newAccessToken, { httpOnly: true, secure: true });
  
              req.userId = decodedRefresh.userId;
              req.userRole = decodedRefresh.role;
  
              if (role && req.userRole !== role) {
                if (req.userRole === "mahasiswa") {
                  return res.redirect("/home");
                } else if (req.userRole === "admin") {
                  return res.redirect("/admin/dashboard");
                }
              }
              return next();
            });
          } else {
            console.log("Verifikasi token akses gagal:", err);
            return res.status(403).json({ message: "Token tidak valid" });
          }
        } else {
          req.userId = decoded.userId;
          req.userRole = decoded.role;
  
          if (role && req.userRole !== role) {
            if (req.userRole === "mahasiswa") {
              return res.redirect("/home");
            } else if (req.userRole === "admin") {
              return res.redirect("/admin/dashboard");
            }
          }
  
          next();
        }
      });
    };
  }
  
  module.exports = verifyToken;