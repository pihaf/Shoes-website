const express = require('express');
const router = express.Router();

const cartController = require('../controllers/cartController');

//get request
router.get('/:userId', cartController.getCartByUser);

//post request
router.post('/:userId/items', cartController.createCartItem);

//put request
router.put('/items/:id', cartController.updateCartItem);

//delete request
router.delete('/items/:id', cartController.deleteCartItem);

module.exports = router;