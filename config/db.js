const Sequelize = require('sequelize');

const db = new Sequelize('db_semhas','root','',{
    host:"localhost",
    dialect:"mysql"
});

module.exports = db; 