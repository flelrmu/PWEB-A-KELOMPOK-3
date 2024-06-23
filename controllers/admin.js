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

exports.deletePendaftaran = async (req, res) => {
    const id = req.params.id;
    console.log(`Received request to delete pendaftaran with id: ${id}`);

    try {
        const result = await Pendaftar.destroy({
            where: {
                idDaftar: id
            }
        });
        if (result === 0) {
            console.log(`No pendaftaran found with id: ${id}`);
            return res.status(404).json({ message: 'Pendaftaran not found' });
        }
        console.log(`Pendaftaran with id ${id} deleted successfully`);
        res.status(200).json({ message: 'Pendaftaran deleted successfully' });
    } catch (error) {
        console.error(`Error deleting pendaftaran with id ${id}:`, error);
        res.status(500).json({ message: 'Error deleting pendaftaran', error });
    }
};
