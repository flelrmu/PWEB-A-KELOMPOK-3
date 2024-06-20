const { Sequelize, DataTypes } = require("sequelize");
const db = require("../config/db");

const DosenPenguji = db.define(
  "dosenPenguji",
  {
    idDosen: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
  },
    nama: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

DosenPenguji.associate = function (models) {
  DosenPenguji.hasMany(models.DetailRiwayatSeminar, { foreignKey: 'idDosen' });
};

module.exports = DosenPenguji;
