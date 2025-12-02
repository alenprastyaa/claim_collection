const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const DataCollection = sequelize.define('DataCollection', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    collector_name: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'collector_name'
    },
    brand_id: {
        type: DataTypes.UUID,
        allowNull: false,
        field: 'brand_id',
        references: {
            model: 'car_brands',
            key: 'id'
        }
    },
    model_id: {
        type: DataTypes.UUID,
        allowNull: false,
        field: 'model_id',
        references: {
            model: 'car_models',
            key: 'id'
        }
    },
    damage_type_id: {
        type: DataTypes.UUID,
        allowNull: false,
        field: 'damage_type_id',
        references: {
            model: 'damage_types',
            key: 'id'
        }
    },
    damage_type_other: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'damage_type_other'
    },
    damaged_part_id: {
        type: DataTypes.UUID,
        allowNull: false,
        field: 'damaged_part_id',
        references: {
            model: 'damaged_parts',
            key: 'id'
        }
    },
    damaged_part_other: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'damaged_part_other'
    },
    photo_url: {
        type: DataTypes.TEXT,
        allowNull: true,
        field: 'photo_url'
    }
}, {
    tableName: 'data_collections',
    timestamps: true,

    underscored: true
});

DataCollection.associate = (models) => {
    DataCollection.belongsTo(models.CarBrand, { foreignKey: 'brand_id', as: 'brand' });
    DataCollection.belongsTo(models.CarModel, { foreignKey: 'model_id', as: 'model' });
    DataCollection.belongsTo(models.DamageType, { foreignKey: 'damage_type_id', as: 'damage_type' });
    DataCollection.belongsTo(models.DamagedPart, { foreignKey: 'damaged_part_id', as: 'damaged_part' });
};

module.exports = DataCollection;