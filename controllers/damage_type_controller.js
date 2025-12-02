const { DamageType } = require('../models');

const GetDamageTypes = async (req, res) => {
    try {
        const { include_inactive } = req.query;
        const where_clause = include_inactive === 'true' ? {} : { is_active: true };

        const damage_types = await DamageType.findAll({
            where: where_clause,
            order: [['name', 'ASC']]
        });

        res.status(200).json({
            success: true,
            message: 'Data Damage Type ditemukan',
            data: damage_types
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const GetDamageTypeById = async (req, res) => {
    try {
        const { id } = req.params;
        const damage_type = await DamageType.findByPk(id);

        if (!damage_type) {
            return res.status(404).json({
                success: false,
                message: 'Damage Type tidak ditemukan'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Damage Type ditemukan',
            data: damage_type
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const CreateDamageType = async (req, res) => {
    try {
        const { name, is_active } = req.body;

        if (!name) {
            return res.status(400).json({
                success: false,
                message: 'Nama damage type wajib diisi'
            });
        }

        const existing_damage = await DamageType.findOne({ where: { name } });
        if (existing_damage) {
            return res.status(400).json({
                success: false,
                message: 'Damage Type sudah ada'
            });
        }

        const damage_type = await DamageType.create({ name, is_active });

        res.status(201).json({
            success: true,
            message: 'Damage Type berhasil dibuat',
            data: damage_type
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const UpdateDamageType = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, is_active } = req.body;

        const damage_type = await DamageType.findByPk(id);
        if (!damage_type) {
            return res.status(404).json({
                success: false,
                message: 'Damage Type tidak ditemukan'
            });
        }

        if (name && name !== damage_type.name) {
            const existing_damage = await DamageType.findOne({ where: { name } });
            if (existing_damage) {
                return res.status(400).json({
                    success: false,
                    message: 'Nama Damage Type sudah digunakan'
                });
            }
        }

        await damage_type.update({ name, is_active });

        res.status(200).json({
            success: true,
            message: 'Damage Type berhasil diupdate',
            data: damage_type
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const DeleteDamageType = async (req, res) => {
    try {
        const { id } = req.params;
        const damage_type = await DamageType.findByPk(id);

        if (!damage_type) {
            return res.status(404).json({
                success: false,
                message: 'Damage Type tidak ditemukan'
            });
        }

        await damage_type.destroy();

        res.status(200).json({
            success: true,
            message: 'Damage Type berhasil dihapus'
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = {
    GetDamageTypes,
    GetDamageTypeById,
    CreateDamageType,
    UpdateDamageType,
    DeleteDamageType
};