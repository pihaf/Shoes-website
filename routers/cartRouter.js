const express = require('express');
const router = express.Router();

const cartController = require('../controllers/cartController');

//get request
router.get('/api/:userId', cartController.getCartByUser);
router.get('/cart', (req, res) => {
  const user = req.user;
  console.log("User from get /cart:");
  console.log(user);
  res.status(200).render('cart', { title: 'Cart', user: user });
});


//post request
router.post('/api/:userId/items', cartController.createCartItem);

//put request
router.put('/api/items/:id', cartController.updateCartItem);

//delete request
router.delete('/api/items/:id', cartController.deleteCartItem);

module.exports = router;