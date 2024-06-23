"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Seminar", {
      idSeminar: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      namaMahasiswa: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      nimMahasiswa: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      topikSeminar: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      judulSeminar: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      dosenPembimbing: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      dosenPenguji1: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      dosenPenguji2: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      status: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      tanggal: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Seminar");
  },
};
