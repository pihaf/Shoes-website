const express = require('express');
const router = express.Router();

const orderController = require('../controllers/ordersController');

//get request
router.get('/:orderId', orderController.getOrderById);
router.get('/:orderId/items', orderController.getOrderItemsByOrder);
router.get('/', orderController.getAllOrders);

//post request
router.post('/user/:userId', orderController.createOrder);
router.post('/orderItem/:orderId', orderController.createOrderItem);

//put request
router.put('/:orderId', orderController.updateOrder);
router.put('/orderItem/:orderItemId', orderController.updateOrderItem);

//delete request
router.delete('/:orderId', orderController.deleteOrder);
router.delete('/orderItem/:orderItemId', orderController.deleteOrderItem);

module.exports = router;