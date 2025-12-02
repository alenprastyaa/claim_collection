const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const damaged_part = sequelize.define('DamagedPart', {
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
    tableName: 'damaged_parts',
    timestamps: true,
    underscored: true
});

module.exports = damaged_part;