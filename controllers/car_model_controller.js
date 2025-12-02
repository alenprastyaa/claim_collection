const { CarModel, CarBrand } = require('../models');

const GetCarModels = async (req, res) => {
    try {
        const { brand_id, include_inactive } = req.query;
        const where_clause = {};

        if (brand_id) where_clause.brand_id = brand_id;
        if (include_inactive !== 'true') where_clause.is_active = true;

        const models = await CarModel.findAll({
            where: where_clause,
            include: [{ model: CarBrand, as: 'brand', attributes: ['id', 'name'] }],
            order: [['name', 'ASC']]
        });

        res.status(200).json({
            success: true,
            message: 'Data Car Model ditemukan',
            data: models
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const GetCarModelById = async (req, res) => {
    try {
        const { id } = req.params;
        const model = await CarModel.findByPk(id, {
            include: [{ model: CarBrand, as: 'brand', attributes: ['id', 'name'] }]
        });

        if (!model) {
            return res.status(404).json({
                success: false,
                message: 'Car Model tidak ditemukan'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Car Model ditemukan',
            data: model
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const CreateCarModel = async (req, res) => {
    try {
        const { brand_id, name, is_active } = req.body;

        if (!brand_id || !name) {
            return res.status(400).json({
                success: false,
                message: 'Brand ID dan nama model wajib diisi'
            });
        }

        const check_brand = await CarBrand.findByPk(brand_id);
        if (!check_brand) {
            return res.status(404).json({
                success: false,
                message: 'Car Brand tidak ditemukan'
            });
        }

        const model = await CarModel.create({ brand_id, name, is_active });

        res.status(201).json({
            success: true,
            message: 'Car Model berhasil dibuat',
            data: model
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const UpdateCarModel = async (req, res) => {
    try {
        const { id } = req.params;
        const { brand_id, name, is_active } = req.body;

        const model = await CarModel.findByPk(id);
        if (!model) {
            return res.status(404).json({
                success: false,
                message: 'Car Model tidak ditemukan'
            });
        }

        if (brand_id) {
            const check_brand = await CarBrand.findByPk(brand_id);
            if (!check_brand) {
                return res.status(404).json({
                    success: false,
                    message: 'Car Brand tidak ditemukan'
                });
            }
        }

        await model.update({ brand_id, name, is_active });

        res.status(200).json({
            success: true,
            message: 'Car Model berhasil diupdate',
            data: model
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const DeleteCarModel = async (req, res) => {
    try {
        const { id } = req.params;
        const model = await CarModel.findByPk(id);

        if (!model) {
            return res.status(404).json({
                success: false,
                message: 'Car Model tidak ditemukan'
            });
        }

        await model.destroy();

        res.status(200).json({
            success: true,
            message: 'Car Model berhasil dihapus'
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = {
    GetCarModels,
    GetCarModelById,
    CreateCarModel,
    UpdateCarModel,
    DeleteCarModel
};