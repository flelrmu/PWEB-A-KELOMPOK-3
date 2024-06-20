<<<<<<< HEAD
const { Sequelize } = require("sequelize");
const db = require("../config/db.js");

const { DataTypes } = Sequelize;

const Daftar = db.define(
  "daftar",
  {
    idDaftar: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
    },
    nim: {
      type: DataTypes.STRING,
    },
    topik: {
      type: DataTypes.STRING,
    },
    judul: {
      type: DataTypes.STRING,
    },
    dosenPembimbing: {
      type: DataTypes.STRING,
    },
    file: {
      type: DataTypes.STRING,
    },
    id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Users', // Nama tabel yang dirujuk
        key: 'id',
      },
    },
  },
  {
    freezeTableName: true,
    timestamps: false
  }
);

// Menambahkan asosiasi
Daftar.associate = function (models) {
  Daftar.belongsTo(models.Users, { foreignKey: 'id' });
  Daftar.hasMany(models.Jadwal, { foreignKey: 'idDaftar' });
  Daftar.hasMany(models.DetailRiwayatSeminar, { foreignKey: 'idDaftar' });
};

module.exports = {
  Daftar,
};
=======
const { Sequelize, DataTypes } = require('sequelize');
const db = require('../config/db.js');

const Pendaftar = db.define('Pendaftar', {
    idDaftar: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    // Define other fields as needed
}, {
    tableName: 'daftar',
    timestamps: false,
});

module.exports = Pendaftar;
>>>>>>> 7d9e033 (update dashboard admin)
