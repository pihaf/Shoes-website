const express = require('express');
const router = express.Router();

const inventoryController = require('../controllers/inventoryController');

//get request
router.get('/', inventoryController.getAllInventory);
router.get('/:id', inventoryController.getInventoryById);
router.get('/product/:productId', inventoryController.getInventoryByProduct);

//post request
router.post('/', inventoryController.createInventory);

//put request
router.put('/:id', inventoryController.updateInventory);

//delete request
router.delete('/:id', inventoryController.deleteInventory);

module.exports = router;