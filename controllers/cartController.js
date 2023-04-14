const Cart = require('../models/carts');
const CartItem = require('../models/cartItems');
const Product = require('../models/products');

exports.getCartByUser = async (req, res) => {
  try {
    const cart = await Cart.findOne({ where: { user_id: req.params.userId }, include: CartItem });
    res.json(cart);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.createCartItem = async (req, res) => {
  try {
    const cart = await Cart.findOne({ where: { user_id: req.params.userId } });
    const product = await Product.findByPk(req.body.productId);
    const cartItem = await CartItem.create({
      cartId: cart.id,
      productId: product.id,
      quantity: req.body.quantity,
      price: product.price
    });
    res.json(cartItem);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.updateCartItem = async (req, res) => {
  try {
    const cartItem = await CartItem.findByPk(req.params.id);
    await cartItem.update(req.body);
    res.json(cartItem);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.deleteCartItem = async (req, res) => {
  try {
    const cartItem = await CartItem.findByPk(req.params.id);
    await cartItem.destroy();
    res.json({ message: 'Cart item deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};