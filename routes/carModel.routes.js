const express = require('express');
const router = express.Router();

const {
    GetCarModels,
    GetCarModelById,
    CreateCarModel,
    UpdateCarModel,
    DeleteCarModel
} = require('../controllers/car_model_controller');

router.get('/', GetCarModels);
router.get('/:id', GetCarModelById);
router.post('/', CreateCarModel);
router.put('/:id', UpdateCarModel);
router.delete('/:id', DeleteCarModel);

module.exports = router;
