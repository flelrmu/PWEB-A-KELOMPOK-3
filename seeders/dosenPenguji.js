("use strict");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "dosenPenguji",
      [
        {
          nama: "Ricky Akbar. .M.Kom",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nama: "Dwi Welly Sukma Nirad. MT",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nama: "Husnil Kamil. .MT",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nama: "Surya Afranius, Prof. Dr. .M.Sc",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nama: "Rahmatika Pratama Santi. .MT",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("dosenPenguji", null, {});
  },
};
