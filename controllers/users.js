const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { Users } = require("../models/users.js");
const { Daftar } = require("../models/pendaftaran.js");

const sendForm = async (req, res) => {
    try {
      const { inputNama, inputNim, inputTopik, inputJudul, inputDospem } = req.body;
      
      const user = await Users.findByPk(req.userId);
      if (!user) {
        return res.status(404).json({ message: "Pengguna tidak ditemukan" });
      }
  
      const newForm = await Daftar.create({ 
        name: inputNama,
        nim: inputNim,
        topik: inputTopik,
        judul: inputJudul,
        dosenPembimbing: inputDospem
      });
  
      console.log('Form Pendaftaran:', newForm); 
  
      return res.redirect('/lihat');
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Terjadi kesalahan server" });
    }
  };

  const editDaftar = async (req, res) => {
    try {
      const {  inputNama, inputNim, inputTopik, inputJudul, inputDospem } =
        req.body;
  
      const user = await Users.findByPk(req.userId);
      if (!user) {
        return res.status(404).json({ message: "Pengguna tidak ditemukan" });
      }
  
      await user.update({
        name: inputNama,
        nim: inputNim,
        topik: inputTopik,
        judul: inputJudul,
        dosenPembimbing: inputDospem,
      });
      return res.redirect("/lihat");
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Terjadi kesalahan server" });
    }
  };
    
  module.exports = sendForm;