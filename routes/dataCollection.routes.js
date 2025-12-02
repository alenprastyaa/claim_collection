const express = require('express');
const router = express.Router();

const {
    GetDataCollections,
    GetDataCollectionById,
    CreateDataCollection,
    UpdateDataCollection,
    DeleteDataCollection
} = require('../controllers/data_collection_controller');
router.get('/', GetDataCollections);
router.get('/:id', GetDataCollectionById);
router.post('/', CreateDataCollection);
router.put('/:id', UpdateDataCollection);
router.delete('/:id', DeleteDataCollection);

module.exports = router;
