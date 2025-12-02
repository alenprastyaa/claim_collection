const express = require('express');
const router = express.Router();

const {
    GetDamageTypes,
    GetDamageTypeById,
    CreateDamageType,
    UpdateDamageType,
    DeleteDamageType
} = require('../controllers/damage_type_controller');

router.get('/', GetDamageTypes);
router.get('/:id', GetDamageTypeById);
router.post('/', CreateDamageType);
router.put('/:id', UpdateDamageType);
router.delete('/:id', DeleteDamageType);

module.exports = router;
