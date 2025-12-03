const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const DataCollection = sequelize.define('DataCollection', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    estimasi_perbaikan: {
        type: DataTypes.JSON,
        allowNull: true
        //name.locationm latitede,langitude
    },
    collector_name: {
        type: DataTypes.STRING,
        field: 'collector_name'
    },
    brand_name: {
        type: DataTypes.STRING,
        field: 'brand_name',
    },
    model_name: {
        type: DataTypes.STRING,
        field: 'model_name',
    },
    damage_type: {
        type: DataTypes.STRING,
        field: 'damage_type',
    },
    damaged_part: {
        type: DataTypes.STRING,
        field: 'damaged_part',
    },
    production_year: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'production_year'
    },

    estimasi_perbaikan: {
        type: DataTypes.ARRAY(DataTypes.JSON),
        allowNull: true
    },
    total_estimasi: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'total_estimasi'
    }
}, {
    tableName: 'data_collections',
    timestamps: true,
    underscored: true
});


module.exports = DataCollection;