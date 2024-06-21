("use strict");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Seminar",
      [
        {
          namaMahasiswa: "doni",
          nimMahasiswa: "123456789",
          topikSeminar: "Topik A",
          judulSeminar: "Judul Seminar A",
          dosenPembimbing: "Ricky Akbar. .M.Kom",
          dosenPenguji1: "Husnil Kamil. .MT",
          dosenPenguji2: "Dr. Penguji 2A",
          status: "Selesai",
          tanggal: new Date(),
        },
        {
          namaMahasiswa: "Jay",
          nimMahasiswa: "987654321",
          topikSeminar: "Topik B",
          judulSeminar: "Judul Seminar B",
          dosenPembimbing: "Husnil Kamil. .MT",
          dosenPenguji1: "Ricky Akbar. .M.Kom",
          dosenPenguji2: "Dwi Welly Sukma Nirad. MT",
          status: "Belum Selesai",
          tanggal: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Seminar", null, {});
  },
};
