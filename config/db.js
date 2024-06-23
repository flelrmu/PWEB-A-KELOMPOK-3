const { Sequelize } = require("sequelize");

const db = new Sequelize("db_seminar", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = db;
