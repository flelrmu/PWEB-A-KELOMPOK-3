const { Sequelize } = require("sequelize");
const dbConfig = require("../config/db.js");

const sequelize = new Sequelize(dbConfig);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Users = require("./users")(sequelize, Sequelize.DataTypes);
db.Daftar = require("./pendaftaran")(sequelize, Sequelize.DataTypes);
db.Jadwal = require("./jadwal")(sequelize, Sequelize.DataTypes);
db.DosenPenguji = require("./DosenPenguji")(sequelize, Sequelize.DataTypes);
db.DetailRiwayatSeminar = require("./DetailRiwayatSeminar")(
  sequelize,
  Sequelize.DataTypes
);

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("Database synchronized");
  })
  .catch((err) => {
    console.error("Database synchronization failed:", err);
  });

module.exports = db;
