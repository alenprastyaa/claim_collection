const {
    DataCollection,
} = require('../models');

const GetDataCollections = async (req, res) => {
    try {
        const collections = await DataCollection.findAll();
        res.status(200).json({
            success: true,
            message: 'Data Collection ditemukan',
            data: collections
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
const GetDataCollectionById = async (req, res) => {
    try {
        const { id } = req.params;

        const collection = await DataCollection.findByPk(id);

        if (!collection) {
            return res.status(404).json({
                success: false,
                message: 'Data Collection tidak ditemukan'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Data Collection ditemukan',
            data: collection
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
const CreateDataCollection = async (req, res) => {
    try {
        const {
            collector_name,
            brand_name,
            model_name,
            damage_type,
            damaged_part,
            production_year,
            estimasi_perbaikan,
            total_estimasi
        } = req.body;
        const newCollection = await DataCollection.create({
            collector_name,
            brand_name,
            model_name,
            damage_type,
            damaged_part,
            production_year,
            estimasi_perbaikan,  // ARRAY JSON
            total_estimasi
        });

        res.status(201).json({
            success: true,
            message: 'Data Collection berhasil dibuat',
            data: newCollection
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
const UpdateDataCollection = async (req, res) => {
    try {
        const { id } = req.params;

        const collection = await DataCollection.findByPk(id);
        if (!collection) {
            return res.status(404).json({
                success: false,
                message: 'Data Collection tidak ditemukan'
            });
        }

        await collection.update(req.body);

        res.status(200).json({
            success: true,
            message: 'Data Collection berhasil diupdate',
            data: collection
        });

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
const DeleteDataCollection = async (req, res) => {
    try {
        const { id } = req.params;

        const collection = await DataCollection.findByPk(id);
        if (!collection) {
            return res.status(404).json({
                success: false,
                message: 'Data Collection tidak ditemukan'
            });
        }

        await collection.destroy();

        res.status(200).json({
            success: true,
            message: 'Data Collection berhasil dihapus'
        });

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = {
    GetDataCollections,
    GetDataCollectionById,
    CreateDataCollection,
    UpdateDataCollection,
    DeleteDataCollection
};
