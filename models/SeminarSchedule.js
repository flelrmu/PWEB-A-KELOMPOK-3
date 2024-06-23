// models/SeminarSchedule.js
const { Sequelize, DataTypes } = require('sequelize');
const db = require('../config/db');

const SeminarSchedule = db.define('SeminarSchedule', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  day: {
    type: DataTypes.STRING,
    allowNull: false
  },
  start1: {
    type: DataTypes.TIME,
    allowNull: true
  },
  start2: {
    type: DataTypes.TIME,
    allowNull: true
  },
}, {
  timestamps: true
});

module.exports = SeminarSchedule;
