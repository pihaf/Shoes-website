const express = require('express');
const router = express.Router();

const orderController = require('../controllers/ordersController');

//get request
router.get('/', orderController.getAllOrders);
router.get('/:id', orderController.getOrderById);
router.get('/:orderId/items', orderController.getOrderItemsByOrder);

//post request
router.post('/', orderController.createOrder);

//put request
router.put('/:id', orderController.updateOrder);

//delete request
router.delete('/:id', orderController.deleteOrder);

module.exports = router;