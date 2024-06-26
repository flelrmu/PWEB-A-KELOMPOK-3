const jwt = require("jsonwebtoken");

function verifyToken(role) {
  return function (req, res, next) {
    const accessToken = req.cookies.token;
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      console.log("No refresh token found, redirecting to login");
      return res.redirect("/login");
    }

    if (!accessToken) {
      console.log("No access token found, redirecting to login");
      return res.redirect("/login");
    }

    jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        if (err.name === "TokenExpiredError") {
          console.log("Access token expired, verifying refresh token");

          jwt.verify(
            refreshToken,
            process.env.REFRESH_TOKEN_SECRET,
            (err, decodedRefresh) => {
              if (err) {
                console.log("Refresh token verification failed:", err);
                return res.redirect("/login");
              }

              const newAccessToken = jwt.sign(
                { userId: decodedRefresh.userId, role: decodedRefresh.role },
                process.env.ACCESS_TOKEN_SECRET,
                {
                  expiresIn: "15m",
                }
              );

              console.log("New access token generated:", newAccessToken);

              res.cookie("token", newAccessToken, {
                httpOnly: true,
                secure: true,
              });

              req.user = {
                id: decodedRefresh.userId,
                role: decodedRefresh.role,
              };

              if (role && req.user.role !== role) {
                if (req.user.role === "mahasiswa") {
                  return res.redirect("/home");
                } else if (req.user.role === "admin") {
                  return res.redirect("/admin/dashboard");
                } else if (req.user.role === "dosen") {
                  return res.redirect("/dosen/dashboard");
                }
              }
              return next();
            }
          );
        } else {
          console.log("Access token verification failed:", err);
          return res.redirect("/login");
        }
      } else {
        req.user = {
          id: decoded.userId,
          role: decoded.role,
        };

        if (role && req.user.role !== role) {
          if (req.user.role === "mahasiswa") {
            return res.redirect("/home");
          } else if (req.user.role === "admin") {
            return res.redirect("/admin/dashboard");
          } else if (req.user.role === "dosen") {
            return res.redirect("/dosen/dashboard");
          }
        }

        next();
      }
    });
  };
}

module.exports = verifyToken;
