const { DamagedPart } = require('../models');

const GetDamagedParts = async (req, res) => {
    try {
        const { include_inactive } = req.query;
        const where_clause = include_inactive === 'true' ? {} : { is_active: true };

        const damaged_parts = await DamagedPart.findAll({
            where: where_clause,
            order: [['name', 'ASC']]
        });

        res.status(200).json({
            success: true,
            message: 'Data Damaged Part ditemukan',
            data: damaged_parts
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const GetDamagedPartById = async (req, res) => {
    try {
        const { id } = req.params;
        const damaged_part = await DamagedPart.findByPk(id);

        if (!damaged_part) {
            return res.status(404).json({
                success: false,
                message: 'Damaged Part tidak ditemukan'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Damaged Part ditemukan',
            data: damaged_part
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const CreateDamagedPart = async (req, res) => {
    try {
        const { name, is_active } = req.body;

        if (!name) {
            return res.status(400).json({
                success: false,
                message: 'Nama damaged part wajib diisi'
            });
        }

        const existing_part = await DamagedPart.findOne({ where: { name } });
        if (existing_part) {
            return res.status(400).json({
                success: false,
                message: 'Damaged Part sudah ada'
            });
        }

        const damaged_part = await DamagedPart.create({ name, is_active });

        res.status(201).json({
            success: true,
            message: 'Damaged Part berhasil dibuat',
            data: damaged_part
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const UpdateDamagedPart = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, is_active } = req.body;

        const damaged_part = await DamagedPart.findByPk(id);
        if (!damaged_part) {
            return res.status(404).json({
                success: false,
                message: 'Damaged Part tidak ditemukan'
            });
        }

        if (name && name !== damaged_part.name) {
            const existing_part = await DamagedPart.findOne({ where: { name } });
            if (existing_part) {
                return res.status(400).json({
                    success: false,
                    message: 'Nama Damaged Part sudah digunakan'
                });
            }
        }

        await damaged_part.update({ name, is_active });

        res.status(200).json({
            success: true,
            message: 'Damaged Part berhasil diupdate',
            data: damaged_part
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const DeleteDamagedPart = async (req, res) => {
    try {
        const { id } = req.params;
        const damaged_part = await DamagedPart.findByPk(id);

        if (!damaged_part) {
            return res.status(404).json({
                success: false,
                message: 'Damaged Part tidak ditemukan'
            });
        }

        await damaged_part.destroy();

        res.status(200).json({
            success: true,
            message: 'Damaged Part berhasil dihapus'
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = {
    GetDamagedParts,
    GetDamagedPartById,
    CreateDamagedPart,
    UpdateDamagedPart,
    DeleteDamagedPart
};