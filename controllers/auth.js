const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");  //hashing dan memverifikasi kata sandi.
const { Users } = require("../models/users.js");
const fs = require("fs/promises");
const multer = require("multer");

const Login = async (req, res) => {   //menangani autentikasi pengguna.(menangani HTTP request method)
  try {
    const user = await Users.findOne({  //Mencari pengguna berdasarkan email.
      where: {
        email: req.body.email,           
      },
    });

    if (!user) {
      throw new Error("Email tidak ditemukan");
    }

    const match = await bcrypt.compare(req.body.password, user.password); //Memverifikasi kata sandi menggunakan bcrypt.

    if (!match) {
      throw new Error("Password salah");
    }

    const userId = user.id;
    const name = user.name;
    const email = user.email;
    const role = user.role;
    const nim = user.nim;
    const hp = user.hp;
    const departemen = user.departemen;

    const token = jwt.sign(              //Membuat token akses dan refresh token menggunakan jsonwebtoken.
      { userId, name, email, role, nim, hp, departemen },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "15m",
      }
    );
    const refreshToken = jwt.sign(          //Memperbarui refresh token di database.
      { userId, name, email, role, nim, hp, departemen },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: "7d",
      }
    );

    await Users.update(
      {
        refresh_token: refreshToken,
      },
      {
        where: {
          id: userId,
        },
      }
    );

    res.cookie("refreshToken", refreshToken, {       //Mengatur cookie untuk token dan refresh token.
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      // secure:true
    });

    res.cookie("token", token, { httpOnly: true });

    if (user.role === "mahasiswa") {           //Mengarahkan pengguna berdasarkan peran (role).
      return res.redirect("/home");
    } else if (user.role === "admin") {
      return res.redirect("/admin/dashboard");
    }  else if (user.role === "dosen") {
      return res.redirect("/dosen/dashboard");
    }
  } catch (error) {
    console.log(error);
    res.status(401).send(error.message);
  }
};

const Logout = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) return res.sendStatus(204);

    const user = await Users.findOne({
      where: {
        refresh_token: refreshToken,
        token: token,
      },
    });

    if (!user) {
      console.log("User tidak ditemukan.");
      return res.sendStatus(204);
    }

    const userId = user.id;

    await Users.update(
      { refresh_token: null },
      {
        where: {
          id: userId,
        },
      }
    );

    res.clearCookie("refreshToken");

    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.status(500).send("Terjadi kesalahan server");
  }
};

function checkUserLoggedIn(req) {     //untuk memeriksa status login pengguna.
  const refreshToken = req.cookies.refreshToken;

  let user = null;

  if (refreshToken) {         //Memverifikasi refresh token dan mengembalikan data pengguna jika valid.
    try {
      const decoded = jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET
      );
      user = {
        userId: decoded.userId,
        name: decoded.name,
        email: decoded.email,
        role: decoded.role,
        nim: decoded.nim,
        hp: decoded.hp,
        departemen: decoded.departemen,
      };
    } catch (error) {
      console.error("Token expired:", error.message);
      return { user: null };
    }
  }
  return { user };
}

const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    const user = await Users.findByPk(req.userId);
    if (!user) {
      return res.status(404).json({ message: "Pengguna tidak ditemukan" });
    }

    const isPasswordValid = await bcrypt.compare(
      currentPassword,
      user.password
    );
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Password salah" });
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    await user.update({ password: hashedNewPassword });

    res.redirect("/logout");
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Terjadi kesalahan server" });
  }
};

const editProfile = async (req, res) => {
  try {
    const { newName, newEmail, newNim, newDepartment, newPhoneNumber } =
      req.body;

    const user = await Users.findByPk(req.userId);
    if (!user) {
      return res.status(404).json({ message: "Pengguna tidak ditemukan" });
    }

    await user.update({
      name: newName,
      email: newEmail,
      nim: newNim,
      departemen: newDepartment,
      hp: newPhoneNumber,
    });
    return res.redirect("/profile");
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Terjadi kesalahan server" });
  }
};

const getUser = async (req, res) => {    //untuk mengambil data pengguna yang sedang login.
  const { user } = checkUserLoggedIn(req, res);  //Memeriksa status login 
  if (!user) {
    return res.redirect("/login");
  }
                                                        
  const newProfile = await Users.findByPk(user.userId);        //mengembalikan data profil pengguna.

  return newProfile;
};

module.exports = {
  Login,
  checkUserLoggedIn,
  Logout,
  getUser,
  editProfile,
  changePassword,
};
