/*const { Sequelize } = require("sequelize");
const db = require("../config/db");
const Users = require("./users");

const { DataTypes } = Sequelize;

const Notifikasi = db.define(
  "notifikasi",
  {
    nama: {
      type: DataTypes.STRING,
    },
    id_user: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: Users,
          key: 'id'
        }
    },
    nim: {
      type: DataTypes.STRING,
    },
    judul: {
      type: DataTypes.STRING,
    },
    dosen_pembimbing:{
      type: DataTypes.STRING,
    },
    createdAt:{
      type: DataTypes.DATE,
      allowNull: false
    }
  },
  {timestamps: true,
    tableName: 'notifikasi'
  }
);

Notifikasi.belongsTo(Users, { foreignKey: 'id_user' });
Users.hasMany(Notifikasi, { foreignKey: 'id_user' });

module.exports = {Notifikasi,};*/
