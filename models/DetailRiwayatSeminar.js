const { Sequelize, DataTypes } = require("sequelize");
const db = require("../config/db");

const DetailRiwayatSeminar = db.define(
  "detailRiwayatSeminar",
  {
    idDetail: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    namaMahasiswa: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nimMahasiswa: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    topikSeminar: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    judul: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dosenPembimbing: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tanggalDaftar: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    tanggalSidang: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    id: {
      type: DataTypes.INTEGER,
      references: {
        model: "Users", // Nama tabel yang dirujuk
        key: "id",
      },
    },
    idJadwal: {
      type: DataTypes.INTEGER,
      references: {
        model: "Jadwal", // Nama tabel yang dirujuk
        key: "idJadwal",
      },
    },
    idDaftar: {
      type: DataTypes.INTEGER,
      references: {
        model: "Daftar", // Nama tabel yang dirujuk
        key: "idDaftar",
      },
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

DetailRiwayatSeminar.associate = function (models) {
  DetailRiwayatSeminar.belongsTo(models.Users, { foreignKey: "id" });
  DetailRiwayatSeminar.belongsTo(models.Jadwal, { foreignKey: "idJadwal" });
  DetailRiwayatSeminar.belongsTo(models.DosenPenguji, { foreignKey: "idDosen" });
  DetailRiwayatSeminar.belongsTo(models.Daftar, { foreignKey: "idDaftar" });
};


module.exports = DetailRiwayatSeminar;
