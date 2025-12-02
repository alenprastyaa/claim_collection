const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const CarModel = sequelize.define('CarModel', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
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
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        field: 'is_active'
    }
}, {
    tableName: 'car_models',
    timestamps: true,
    underscored: true
});

CarModel.associate = (models) => {
    CarModel.belongsTo(models.CarBrand, { foreignKey: 'brand_id', as: 'brand' });
};

module.exports = CarModel;