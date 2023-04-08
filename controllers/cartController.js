const Cart = require('../models/carts');
const CartItem = require('../models/cartItems');
const Product = require('../models/products');


exports.getCartByUser = async (req, res) => {
  const cart = await Cart.findOne({ where: { user_id: req.params.userId }, include: CartItem });
  res.json(cart);
};

exports.createCartItem = async (req, res) => {
  const cart = await Cart.findOne({ where: { user_id: req.params.userId } });
  const product = await Product.findByPk(req.body.productId);
  const cartItem = await CartItem.create({
    cartId: cart.id,
    productId: product.id,
    quantity: req.body.quantity,
    price: product.price
  });
  res.json(cartItem);
};

exports.updateCartItem = async (req, res) => {
  const cartItem = await CartItem.findByPk(req.params.id);
  await cartItem.update(req.body);
  res.json(cartItem);
};

exports.deleteCartItem = async (req, res) => {
  const cartItem = await CartItem.findByPk(req.params.id);
  await cartItem.destroy();
  res.json({ message: 'Cart item deleted successfully' });
};