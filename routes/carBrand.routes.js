const express = require('express');
const router = express.Router();

const {
    GetCarBrands,
    GetCarBrandById,
    CreateCarBrand,
    UpdateCarBrand,
    DeleteCarBrand
} = require('../controllers/car_brand_controller');

router.get('/', GetCarBrands);
router.get('/:id', GetCarBrandById);
router.post('/', CreateCarBrand);
router.put('/:id', UpdateCarBrand);
router.delete('/:id', DeleteCarBrand);

module.exports = router;
