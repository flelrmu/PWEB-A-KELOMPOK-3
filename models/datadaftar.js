const { Sequelize, DataTypes } = require('sequelize');
const db = require('../config/db.js');

const Datadaftar = db.define('Datadaftar', {
    idDaftar: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    nim: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    topik: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    judul: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    dosenPembimbing: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    file: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
    },
}, {
    tableName: 'daftar',
    timestamps: true,
});

module.exports = Datadaftar;