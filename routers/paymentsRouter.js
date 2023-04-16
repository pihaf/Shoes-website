const express = require('express');
const router = express.Router();

const paymentController = require('../controllers/paymentsController');

//get request
router.get('/:id', paymentController.getPaymentById);
router.get('/order/:orderId', paymentController.getPaymentsByOrder);
router.get('/', paymentController.getAllPayments);

//post request
router.post('/', paymentController.createPayment);

//put request
router.put('/:id', paymentController.updatePayment);

//delete request
router.delete('/:id', paymentController.deletePayment);

module.exports = router;