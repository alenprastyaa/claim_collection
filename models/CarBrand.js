const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const CarBrand = sequelize.define('CarBrand', {
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
    tableName: 'car_brands',
    timestamps: true,
    underscored: true
});

CarBrand.associate = (models) => {
    CarBrand.hasMany(models.CarModel, { foreignKey: 'brand_id', as: 'models' });
};

module.exports = CarBrand;