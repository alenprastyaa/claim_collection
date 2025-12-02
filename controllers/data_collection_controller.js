const {
    DataCollection,
    CarBrand,
    CarModel,
    DamageType,
    DamagedPart
} = require('../models');

const GetDataCollections = async (req, res) => {
    try {
        const { brand_id, model_id, damage_type_id, damaged_part_id } = req.query;
        const where_clause = {};

        if (brand_id) where_clause.brand_id = brand_id;
        if (model_id) where_clause.model_id = model_id;
        if (damage_type_id) where_clause.damage_type_id = damage_type_id;
        if (damaged_part_id) where_clause.damaged_part_id = damaged_part_id;

        const collections = await DataCollection.findAll({
            where: where_clause,
            include: [
                { model: CarBrand, as: 'brand', attributes: ['id', 'name'] },
                { model: CarModel, as: 'model', attributes: ['id', 'name'] },
                { model: DamageType, as: 'damage_type', attributes: ['id', 'name'] },
                { model: DamagedPart, as: 'damaged_part', attributes: ['id', 'name'] }
            ],
            order: [['createdAt', 'DESC']]
        });

        res.status(200).json({
            success: true,
            message: 'Data Collection ditemukan',
            data: collections
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// =========================
// GET BY ID
// =========================
const GetDataCollectionById = async (req, res) => {
    try {
        const { id } = req.params;
        const collection = await DataCollection.findByPk(id, {
            include: [
                { model: CarBrand, as: 'brand', attributes: ['id', 'name'] },
                { model: CarModel, as: 'model', attributes: ['id', 'name'] },
                { model: DamageType, as: 'damage_type', attributes: ['id', 'name'] },
                { model: DamagedPart, as: 'damaged_part', attributes: ['id', 'name'] }
            ]
        });

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
            brand_id,
            model_id,
            damage_type_id,
            damage_type_other,
            damaged_part_id,
            damaged_part_other,
            photo_url
        } = req.body;

        if (!collector_name || !brand_id || !model_id || !damage_type_id || !damaged_part_id) {
            return res.status(400).json({
                success: false,
                message: 'Semua field wajib diisi'
            });
        }

        const check_brand = await CarBrand.findByPk(brand_id);
        if (!check_brand) return res.status(404).json({ success: false, message: 'Car Brand tidak ditemukan' });

        const check_model = await CarModel.findOne({ where: { id: model_id, brand_id } });
        if (!check_model) return res.status(404).json({ success: false, message: 'Model tidak sesuai dengan brand' });

        const check_damage_type = await DamageType.findByPk(damage_type_id);
        if (!check_damage_type) return res.status(404).json({ success: false, message: 'Damage Type tidak ditemukan' });

        const check_damaged_part = await DamagedPart.findByPk(damaged_part_id);
        if (!check_damaged_part) return res.status(404).json({ success: false, message: 'Damaged Part tidak ditemukan' });

        const collection = await DataCollection.create({
            collector_name,
            brand_id,
            model_id,
            damage_type_id,
            damage_type_other,
            damaged_part_id,
            damaged_part_other,
            photo_url
        });

        res.status(201).json({
            success: true,
            message: 'Data Collection berhasil dibuat',
            data: collection
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

        const {
            collector_name,
            brand_id,
            model_id,
            damage_type_id,
            damage_type_other,
            damaged_part_id,
            damaged_part_other,
            photo_url
        } = req.body;

        if (brand_id) {
            const check_brand = await CarBrand.findByPk(brand_id);
            if (!check_brand) return res.status(404).json({ success: false, message: 'Brand tidak ditemukan' });
        }

        if (model_id && brand_id) {
            const check_model = await CarModel.findOne({ where: { id: model_id, brand_id } });
            if (!check_model) return res.status(404).json({ success: false, message: 'Model tidak sesuai brand' });
        }

        if (damage_type_id) {
            const check_damage = await DamageType.findByPk(damage_type_id);
            if (!check_damage) return res.status(404).json({ success: false, message: 'Damage Type tidak ditemukan' });
        }

        if (damaged_part_id) {
            const check_part = await DamagedPart.findByPk(damaged_part_id);
            if (!check_part) return res.status(404).json({ success: false, message: 'Damaged Part tidak ditemukan' });
        }

        await collection.update({
            collector_name,
            brand_id,
            model_id,
            damage_type_id,
            damage_type_other,
            damaged_part_id,
            damaged_part_other,
            photo_url
        });

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
