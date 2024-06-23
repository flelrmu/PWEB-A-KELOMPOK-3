var express = require("express");
const verifyToken = require("../middleware/tokenvalid.js");
const {
  editProfile,
  getUser,
  changePassword,
} = require("../controllers/auth.js");
var router = express.Router();
const users = require("../controllers/users.js");
const upload = require("../middleware/upload");
const { Daftar } = require("../models/pendaftaran.js");

router.get("/", (req, res) => {
  res.redirect("/login");
});

router.get("/home", verifyToken("mahasiswa"), async function (req, res) {
  const user = await getUser(req, res);
  res.render("mahasiswa/home", { user });
});

router.get("/profile", verifyToken("mahasiswa"), async function (req, res) {
  const user = await getUser(req, res);
  res.render("mahasiswa/profile", { user });
});

router.get("/daftarhadir", verifyToken("mahasiswa"), async function (req, res) {
  const user = await getUser(req, res);
  res.render("mahasiswa/daftarhadir", { user });
});

router.get(
  "/profile/ubahpassword",
  verifyToken("mahasiswa"),
  async function (req, res) {
    const user = await getUser(req, res);
    res.render("mahasiswa/ubahpassword", { user });
  }
);

router.post("/ubahpassword", verifyToken("mahasiswa"), async (req, res) => {
  await changePassword(req, res);
});

router.get("/logout", (req, res) => {
  res.clearCookie("refreshToken");
  res.redirect("/login");
});

router.get(
  "/profile/editprofil",
  verifyToken("mahasiswa"),
  async (req, res) => {
    const user = await getUser(req, res);
    res.render("mahasiswa/editprofil", { user });
  }
);

router.post("/editprofil", verifyToken("mahasiswa"), async (req, res) => {
  await editProfile(req, res);
});

router.get("/daftar", verifyToken("mahasiswa"), users.getForm);

router.post(
  "/daftar",
  verifyToken("mahasiswa"),
  upload.single("file"),
  users.sendForm
);

router.get("/lihat", verifyToken("mahasiswa"), async (req, res) => {
  try {
    const userId = req.user.id;
    const daftar = await Daftar.findOne({ where: { id: userId } });

    if (!daftar) {
      return res.status(404).send("Pendaftaran tidak ditemukan");
    }

    res.render("mahasiswa/lihat", {
      idDaftar: daftar.idDaftar,
      namaMahasiswa: daftar.name,
      nimMahasiswa: daftar.nim,
      topikSeminar: daftar.topik,
      judul: daftar.judul,
      dosenPembimbing: daftar.dosenPembimbing,
      file: daftar.file,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Terjadi kesalahan server");
  }
});

router.get("/lihat/:idDaftar?", verifyToken("mahasiswa"), async (req, res) => {
  try {
    const idDaftar = req.params.idDaftar;
    const userId = req.user.id;
    let pendaftaran;

    if (idDaftar) {
      pendaftaran = await Daftar.findByPk(idDaftar);
    } else {
      pendaftaran = await Daftar.findOne({ where: { id: userId } });
    }

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
});

router.get("/editdaftar/:idDaftar", verifyToken("mahasiswa"), users.editForm);

router.post(
  "/editdaftar/:idDaftar",
  verifyToken("mahasiswa"),
  upload.single("file"),
  users.editDaftar
);

// router.get("/riwayat", verifyToken("mahasiswa"), async function (req, res) {
//   const user = await getUser(req, res);
//   res.render("mahasiswa/riwayat", { user });
// });

// router.get("/detailRiwayat", users.getRiwayatSeminar, verifyToken("mahasiswa"), async function (req, res) {
//   const user = await getUser(req, res);
//   res.render("mahasiswa/detailRiwayat", { user });
// });

router.get("/riwayat", verifyToken("mahasiswa"), async (req, res) => {
  try {
    const userId = req.user.id;
    const daftar = await Daftar.findOne({
      where: {
        id: userId,
      },
    });

    if (!daftar) {
      return res.status(404).send("Riwayat tidak ditemukan");
    }

    res.render("mahasiswa/riwayat", {
      idDaftar: daftar.idDaftar,
      namaMahasiswa: daftar.name,
      nimMahasiswa: daftar.nim,
      topikSeminar: daftar.topik,
      judul: daftar.judul,
      dosenPembimbing: daftar.dosenPembimbing,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Terjadi kesalahan server");
  }
});

router.get(
  "/riwayat/:idDaftar?",
  verifyToken("mahasiswa"),
  async (req, res) => {
    try {
      const idDaftar = req.params.idDaftar;
      const userId = req.user.id;
      let riwayat;

      if (idDaftar) {
        riwayat = await Daftar.findByPk(idDaftar);
      } else {
        riwayat = await Daftar.findOne({
          where: {
            id: userId,
          },
        });
      }

      if (riwayat) {
        res.render("mahasiswa/riwayat", {
          idDaftar: riwayat.idDaftar,
          namaMahasiswa: riwayat.name,
          nimMahasiswa: riwayat.nim,
          topikSeminar: riwayat.topik,
          judul: riwayat.judul,
          dosenPembimbing: riwayat.dosenPembimbing,
        });
      } else {
        res.status(404).send("Riwayat tidak ditemukan");
      }
    } catch (error) {
      console.error(error);
      res.status(500).send("Terjadi kesalahan server");
    }
  }
);

router.get(
  "/detailRiwayat/:idDaftar",
  verifyToken("mahasiswa"),
  users.getDetailRiwayatSeminar
);

router.get("/jadwal", verifyToken("mahasiswa"), async function (req, res) {
  const user = await getUser(req, res);
  res.render("mahasiswa/jadwal", { user });
});

router.post("/submit-jadwal", verifyToken("mahasiswa"), users.submitJadwal);

router.get("/cari", verifyToken("mahasiswa"), users.searchSeminar);

module.exports = router;
