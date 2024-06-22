const { Sequelize } = require("sequelize");
const db = require("../config/db.js");

const { DataTypes } = Sequelize;

const Seminar = db.define(
  "Seminar",
  {
    idSeminar: {
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
    judulSeminar: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dosenPembimbing: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dosenPenguji1: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dosenPenguji2: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tanggal: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

module.exports = Seminar;
