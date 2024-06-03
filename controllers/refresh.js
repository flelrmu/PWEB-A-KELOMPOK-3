const jwt = require("jsonwebtoken");
const { Users } = require("../models/users.js");

const refreshToken = async (req, res) => {   //definisikan fungsi refreshToken sebagai fungsi asinkron.
  try {
    const refreshToken = req.cookies.refreshToken;  //Mengambil refreshToken dari cookie pengguna.
    if (!refreshToken) return res.sendStatus(401);  //Jika refreshToken tidak ada, mengembalikan status 401 (respon).

    console.log("Menerima refresh token:", refreshToken);

    const user = await Users.findOne({  //Mencari pengguna di database yang memiliki refresh_token yang sesuai.
      where: { refresh_token: refreshToken },
    });

    if (!user) {
      console.log("User tidak ditemukan.");
      return res.sendStatus(403);     //Jika pengguna tidak ditemukan, mengembalikan status 403 atau forbidden.
    }

    console.log("User ditemukan:", user);

    jwt.verify(            //Memverifikasi refreshToken menggunakan jsonwebtoken dan REFRESH_TOKEN_SECRET.
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      (err, decoded) => {
        if (err) {
          console.log("Verifikasi refresh token gagal:", err);
          return res.sendStatus(403);
        }

        //Mengambil informasi pengguna dari refreshToken yang sudah terverifikasi.
        const { userId, name, email, role, nim, hp, departemen } = decoded;  
        const newAccessToken = jwt.sign(
          { userId, name, email, role, nim, hp, departemen },
          process.env.ACCESS_TOKEN_SECRET, //Membuat token akses baru dengan informasi pengguna dan ACCESS_TOKEN_SECRET.
          {
            expiresIn: "10s", //Mengatur masa berlaku token akses baru.
          }
        );

        console.log("Token akses baru dibuat:", newAccessToken);

        res.json({ accessToken: newAccessToken }); //ini untuk mengirim token akses baru sebagai respon dalam format JSON.
      }
    );
  } catch (error) {  //Menangani kesalahan yang terjadi selama proses refresh token.
    console.error("Refresh token error:", error);
    res.status(500).json({ message: "Internal server error" }); //Mengembalikan status 500 jika terjadi kesalahan server.
  }
};

module.exports = refreshToken;
