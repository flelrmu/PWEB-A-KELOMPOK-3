const { Sequelize } = require("sequelize");
const db = require("../config/db.js");

const { DataTypes } = Sequelize;

    const Jadwal = db.define(
      'Jadwal', 
      {
      tanggal: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      idDaftar: {
        type: DataTypes.INTEGER,
        references: {
          model: 'daftar',
          key: 'idDaftar'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }
    }, {
      freezeTableName: true,
    });
    
    Jadwal.associate = function(models) {
      Jadwal.belongsTo(models.Daftar, { foreignKey: 'idDaftar' });
    };
    
    module.exports = {
      Jadwal,
    };
    