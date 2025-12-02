const express = require('express');
const router = express.Router();

const {
    GetDamagedParts,
    GetDamagedPartById,
    CreateDamagedPart,
    UpdateDamagedPart,
    DeleteDamagedPart
} = require('../controllers/damaged_part_controller');

router.get('/', GetDamagedParts);
router.get('/:id', GetDamagedPartById);
router.post('/', CreateDamagedPart);
router.put('/:id', UpdateDamagedPart);
router.delete('/:id', DeleteDamagedPart);

module.exports = router;
