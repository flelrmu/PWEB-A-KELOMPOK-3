const { Sequelize } = require("sequelize");
const db = require("../config/db.js");

const { DataTypes } = Sequelize;

const Jadwal = db.define(
  "Jadwal",
  {
    idJadwal: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    tanggal: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    idDaftar: {
      type: DataTypes.INTEGER,
      references: {
        model: "daftar",
        key: "idDaftar",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

Jadwal.associate = function (models) {
  Jadwal.belongsTo(models.Daftar, { foreignKey: "idDaftar" });
  Jadwal.belongsTo(models.Daftar);
  Jadwal.hasMany(models.DetailRiwayatSeminar, { foreignKey: "idJadwal" });
};

module.exports = {
  Jadwal,
};
