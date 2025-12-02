const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const damage_type = sequelize.define('DamageType', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        field: 'is_active'
    }
}, {
    tableName: 'damage_types',
    timestamps: true,
    underscored: true
});

module.exports = damage_type;