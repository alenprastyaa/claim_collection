
const { CarBrand, CarModel } = require('../models');

const GetCarBrands = async (req, res) => {
    try {
        const { include_inactive } = req.query;
        const where_clause = include_inactive === 'true' ? {} : { is_active: true };
        const brands = await CarBrand.findAll({
            where: where_clause,
            include: [{
                model: CarModel,
                as: 'models',
                where: { is_active: true },
                required: false
            }],
            order: [['name', 'ASC']]
        });

        res.status(200).json({
            success: true,
            message: 'Data Car Brand ditemukan',
            data: brands
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const GetCarBrandById = async (req, res) => {
    try {
        const { id } = req.params;
        const brand = await CarBrand.findByPk(id, {
            include: [{ model: CarModel, as: 'models' }]
        });

        if (!brand) {
            return res.status(404).json({
                success: false,
                message: 'Car Brand tidak ditemukan'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Car Brand ditemukan',
            data: brand
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const CreateCarBrand = async (req, res) => {
    try {
        const { name, is_active } = req.body;

        if (!name) {
            return res.status(400).json({
                success: false,
                message: 'Nama brand wajib diisi'
            });
        }

        const existing_brand = await CarBrand.findOne({ where: { name } });
        if (existing_brand) {
            return res.status(400).json({
                success: false,
                message: 'Car Brand sudah ada'
            });
        }

        const brand = await CarBrand.create({ name, is_active });

        res.status(201).json({
            success: true,
            message: 'Car Brand berhasil dibuat',
            data: brand
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const UpdateCarBrand = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, is_active } = req.body;

        const brand = await CarBrand.findByPk(id);
        if (!brand) {
            return res.status(404).json({
                success: false,
                message: 'Car Brand tidak ditemukan'
            });
        }

        if (name && name !== brand.name) {
            const existing_brand = await CarBrand.findOne({ where: { name } });
            if (existing_brand) {
                return res.status(400).json({
                    success: false,
                    message: 'Nama Car Brand sudah digunakan'
                });
            }
        }

        await brand.update({ name, is_active });

        res.status(200).json({
            success: true,
            message: 'Car Brand berhasil diupdate',
            data: brand
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const DeleteCarBrand = async (req, res) => {
    try {
        const { id } = req.params;
        const brand = await CarBrand.findByPk(id);

        if (!brand) {
            return res.status(404).json({
                success: false,
                message: 'Car Brand tidak ditemukan'
            });
        }

        await brand.destroy();

        res.status(200).json({
            success: true,
            message: 'Car Brand berhasil dihapus'
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = {
    GetCarBrands,
    GetCarBrandById,
    CreateCarBrand,
    UpdateCarBrand,
    DeleteCarBrand
};