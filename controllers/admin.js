const Pendaftar = require('../models/pendaftaran');

exports.dashboard = async (req, res) => {
    try {
        const count = await Pendaftar.count();
        res.render('admin/dashboard', { count });
    } catch (error) {
        console.error("Error fetching registration count:", error);
        res.status(500).send('Internal Server Error');
    }
};
