const sequelize = require('../config/database');
const CarBrand = require('./CarBrand');
const CarModel = require('./CarModel');
const DamageType = require('./DamageType');
const DamagedPart = require('./DamagedPart');
const DataCollection = require('./DataCollection');

const db = {
    sequelize,
    CarBrand,
    CarModel,
    DamageType,
    DamagedPart,
    DataCollection
};

Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

module.exports = db;