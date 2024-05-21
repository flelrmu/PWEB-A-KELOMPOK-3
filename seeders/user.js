const bcrypt = require("bcrypt");
("use strict");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          email: "2211523021_muhammad@student.unand.ac.id",
          name: "Farhan",
          nim: "2211523021",
          password: await bcrypt.hash("farhan", 10),
          role: "mahasiswa",
          departemen: "Sistem Informasi",
          hp: "085156462439",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          email: "2211522033_risyda@student.unand.ac.id ",
          name: "Risyda Azifatil Maghfira",
          nim: "2211522033",
          password: await bcrypt.hash("risyda", 10),
          role: "mahasiswa",
          departemen: "Sistem Informasi",
          hp: "085211593359",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          email: "2211523017_vatya@student.unand.ac.id ",
          name: "Vatya Arsha Mahmudi",
          nim: "2211523017",
          password: await bcrypt.hash("vatya", 10),
          role: "mahasiswa",
          departemen: "Sistem Informasi",
          hp: "082384639175",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          email: "admin@gmail.com",
          name: "Admin",
          nim: "2216523821",
          password: await bcrypt.hash("admin", 10),
          role: "admin",
          departemen: "Sistem Informasi",
          hp: "083264422379",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
