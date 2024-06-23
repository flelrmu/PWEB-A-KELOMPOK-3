const Pendaftar = require('../models/datadaftar');

exports.dashboard = async (req, res) => {
    try {
        const count = await Pendaftar.count();
        res.render('admin/dashboard', { count });
    } catch (error) {
        console.error("Error fetching registration count:", error);
        res.status(500).send('Internal Server Error');
    }
};

exports.pendaftaranSeminar = async (req, res) => {
    try {
        const pendaftarans = await Pendaftar.findAll();
        res.render('admin/pendaftaran', { pendaftarans });
    } catch (error) {
        console.error("Error retrieving pendaftarans:", error);
        res.status(500).json({ message: "Error retrieving pendaftarans" });
    }
};
