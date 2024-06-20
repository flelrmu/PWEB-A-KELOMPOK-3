"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("detailRiwayatSeminar", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
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
      judul: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      dosenPembimbing: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      tanggalDaftar: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      tanggalSidang: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("detailRiwayatSeminar");
  },
};
