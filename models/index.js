const Sequelize = require("sequelize");
const dbConfig = require("../config/db.js");

const sequelize = new Sequelize(dbConfig);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Users = require("./users.js")(sequelize, Sequelize.DataTypes);
db.Daftar = require("./pendaftaran.js")(sequelize, Sequelize.DataTypes);

// Panggil method associate untuk menghubungkan asosiasi
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

module.exports = db;
