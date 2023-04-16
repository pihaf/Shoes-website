const express = require('express');
const router = express.Router();

const orderController = require('../controllers/ordersController');

//get request
router.get('/:id', orderController.getOrderById);
router.get('/:orderId/items', orderController.getOrderItemsByOrder);
router.get('/', orderController.getAllOrders);

//post request
router.post('/', orderController.createOrder);

//put request
router.put('/:id', orderController.updateOrder);

//delete request
router.delete('/:id', orderController.deleteOrder);

module.exports = router;