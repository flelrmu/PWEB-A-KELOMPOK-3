const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { Users } = require("../models/users.js");
const { Jadwal } = require("../models/jadwal.js");
const { Daftar } = require("../models/pendaftaran.js");
const Seminar = require("../models/seminar");
const { Op } = require("sequelize");
const path = require("path");
const fs = require("fs");

exports.sendForm = async (req, res) => {
  try {
    const { inputNama, inputNim, inputTopik, inputJudul, inputDospem } =
      req.body;
    const filePath = req.file.path;
    const userId = req.user.id;

    const existingForm = await Daftar.findOne({ where: { id: userId } });

    if (existingForm) {
      return res
        .status(400)
        .json({ message: "Anda sudah mendaftar untuk seminar ini" });
    }

    const newForm = await Daftar.create({
      name: inputNama,
      nim: inputNim,
      topik: inputTopik,
      judul: inputJudul,
      dosenPembimbing: inputDospem,
      file: filePath,
      id: userId,
    });

    return res.redirect("/lihat/" + newForm.idDaftar);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Terjadi kesalahan saat melakukan pendaftaran" });
  }
};

exports.editDaftar = async (req, res) => {
  try {
    const { inputNama, inputNim, inputTopik, inputJudul, inputDospem } =
      req.body;
    const daftar = await Daftar.findByPk(req.params.idDaftar);

    if (!daftar) {
      return res.status(404).json({ message: "Pendaftaran tidak ditemukan" });
    }

    const filePath = req.file ? req.file.path : daftar.file;

    const userId = req.user.id;

    await daftar.update({
      name: inputNama,
      nim: inputNim,
      topik: inputTopik,
      judul: inputJudul,
      dosenPembimbing: inputDospem,
      file: filePath,
      id: userId,
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
      res.render("mahasiswa/lihat", {
        idDaftar: pendaftaran.idDaftar,
        namaMahasiswa: pendaftaran.name,
        nimMahasiswa: pendaftaran.nim,
        topikSeminar: pendaftaran.topik,
        judul: pendaftaran.judul,
        dosenPembimbing: pendaftaran.dosenPembimbing,
        file: pendaftaran.file,
      });
    } else {
      res.status(404).send("Pendaftaran tidak ditemukan");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Terjadi kesalahan server");
  }
};

exports.editForm = async (req, res) => {
  try {
    const daftar = await Daftar.findByPk(req.params.idDaftar);
    if (!daftar) {
      return res.status(404).json({ message: "Pendaftaran tidak ditemukan" });
    }
    res.render("mahasiswa/editdaftar", {
      daftar,
      idDaftar: req.params.idDaftar,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Terjadi kesalahan server");
  }
};

exports.submitJadwal = async (req, res) => {
  try {
    const { jadwal } = req.body;
    const userId = req.user.id;

    if (!userId) {
      return res.status(400).send("User ID is required");
    }

    const daftar = await Daftar.findOne({ where: { id: userId } });

    if (!daftar) {
      return res.status(404).send("Daftar tidak ditemukan");
    }

    await Jadwal.create({
      tanggal: jadwal,
      idDaftar: daftar.idDaftar,
    });

    res.redirect("/lihat/" + daftar.idDaftar);
  } catch (error) {
    console.error(error);
    res.status(500).send("Terjadi kesalahan server");
  }
};

exports.getRiwayatSeminar = async (req, res) => {
  try {
    const riwayat = await Daftar.findByPk(req.params.idDaftar, {});

    if (!riwayat) {
      return res.status(404).send("Riwayat tidak ditemukan");
    }

    res.render("mahasiswa/riwayat", {
      idDaftar: riwayat.idDaftar,
      namaMahasiswa: riwayat.name,
      nimMahasiswa: riwayat.nim,
      topikSeminar: riwayat.topik,
      judul: riwayat.judul,
      dosenPembimbing: riwayat.dosenPembimbing,
      dosenPenguji: riwayat.nama,
      status: riwayat.status,
      tanggal: riwayat.tanggal,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Terjadi kesalahan server");
  }
};

exports.getDetailRiwayatSeminar = async (req, res) => {
  try {
    const detailRiwayat = await Daftar.findByPk(req.params.idDaftar, {});

    if (!detailRiwayat) {
      return res.status(404).send("Detail riwayat tidak ditemukan");
    }

    res.render("mahasiswa/detailRiwayat", {
      idDaftar: detailRiwayat.idDaftar,
      namaMahasiswa: detailRiwayat.name,
      nimMahasiswa: detailRiwayat.nim,
      topikSeminar: detailRiwayat.topik,
      judul: detailRiwayat.judul,
      dosenPembimbing: detailRiwayat.dosenPembimbing,
      dosenPenguji: detailRiwayat.nama,
      status: detailRiwayat.status,
      tanggal: detailRiwayat.tanggal,
      hasil: detailRiwayat.hasil,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Terjadi kesalahan server");
  }
};

exports.searchSeminar = async (req, res) => {
  try {
    const { term } = req.query;
    const seminars = await Seminar.findAll({
      where: {
        [Op.or]: [
          { namaMahasiswa: { [Op.like]: `%${term}%` } },
          { nimMahasiswa: { [Op.like]: `%${term}%` } },
          { topikSeminar: { [Op.like]: `%${term}%` } },
          { judulSeminar: { [Op.like]: `%${term}%` } },
          { dosenPembimbing: { [Op.like]: `%${term}%` } },
          { dosenPenguji1: { [Op.like]: `%${term}%` } },
          { dosenPenguji2: { [Op.like]: `%${term}%` } },
        ],
      },
    });
    res.render("mahasiswa/cari", { query: term, seminars });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};
