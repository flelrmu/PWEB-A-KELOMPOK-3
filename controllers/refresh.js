const jwt = require('jsonwebtoken');
const {Users} = require('../models/users.js');

const refreshToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.sendStatus(401);

    console.log('Menerima refresh token:', refreshToken);

    const user = await Users.findOne({
      where: { refresh_token: refreshToken },
    });

    if (!user) {
      console.log('User tidak ditemukan.');
      return res.sendStatus(403);
    }

    console.log('User ditemukan:', user);

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        console.log('Verifikasi refresh token gagal:', err);
        return res.sendStatus(403);
      }

      const { userId, name, email, role, nim, hp, departemen } = decoded;
      const newAccessToken = jwt.sign({ userId, name, email, role, nim, hp, departemen }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "10s",
      });

      console.log('Token akses baru dibuat:', newAccessToken);

      res.json({ accessToken: newAccessToken });
    });
  } catch (error) {
    console.error("Refresh token error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = refreshToken;