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
  }
);

// Menambahkan asosiasi
Daftar.associate = function (models) {
  Daftar.belongsTo(models.Users, { foreignKey: 'id' });
};

Daftar.associate = function(models) {
  Daftar.hasMany(models.Jadwal, { foreignKey: 'idDaftar' });
};

module.exports = {
  Daftar,
};
