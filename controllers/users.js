const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { Users } = require("../models/users.js");
const { Daftar } = require("../models/pendaftaran.js");
const path = require('path');
const fs = require('fs');

exports.sendForm = async (req, res) => {
  try {
    const { inputNama, inputNim, inputTopik, inputJudul, inputDospem } = req.body;
    const filePath = req.file.path;

    const newForm = await Daftar.create({
      name: inputNama,
      nim: inputNim,
      topik: inputTopik,
      judul: inputJudul,
      dosenPembimbing: inputDospem,
      file: filePath,
    });

    return res.redirect("/lihat/" + newForm.idDaftar);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Terjadi kesalahan server" });
  }
};

exports.editDaftar = async (req, res) => {
  try {
    const { inputNama, inputNim, inputTopik, inputJudul, inputDospem } = req.body;
    const daftar = await Daftar.findByPk(req.params.idDaftar);

    if (!daftar) {
      return res.status(404).json({ message: "Pendaftaran tidak ditemukan" });
    }

    const filePath = req.file ? req.file.path : daftar.file;

    await daftar.update({
      name: inputNama,
      nim: inputNim,
      topik: inputTopik,
      judul: inputJudul,
      dosenPembimbing: inputDospem,
      file: filePath,
    });

    return res.redirect("/lihat/" + daftar.idDaftar);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Terjadi kesalahan server" });
  }
};

exports.getForm = (req, res) => {
  res.render("mahasiswa/daftar");
};

exports.getDaftar = async (req, res) => {
  try {
    const pendaftaran = await Daftar.findByPk(req.params.idDaftar);
    if (pendaftaran) {
      res.render('mahasiswa/lihat', {
        idDaftar: pendaftaran.idDaftar,
        namaMahasiswa: pendaftaran.name,
        nimMahasiswa: pendaftaran.nim,
        topikSeminar: pendaftaran.topik,
        judul: pendaftaran.judul,
        dosenPembimbing: pendaftaran.dosenPembimbing,
        file: pendaftaran.file
      });
    } else {
      res.status(404).send('Pendaftaran tidak ditemukan');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Terjadi kesalahan server');
  }
};

exports.editForm = async (req, res) => {
  try {
    const daftar = await Daftar.findByPk(req.params.idDaftar);
    if (!daftar) {
      return res.status(404).json({ message: "Pendaftaran tidak ditemukan" });
    }
    res.render("mahasiswa/editdaftar", { daftar, idDaftar: req.params.idDaftar });
  } catch (error) {
    console.error(error);
    res.status(500).send('Terjadi kesalahan server');
  }
};