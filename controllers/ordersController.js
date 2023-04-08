const Order = require('../models/orders');
const OrderItem = require('../models/orderItems');
const Product = require('../models/products');

exports.getAllOrders = async (req, res) => {
  const orders = await Order.findAll();
  res.json(orders);
};

exports.getOrderById = async (req, res) => {
  const order = await Order.findByPk(req.params.id, { include: OrderItem });
  res.json(order);
};

exports.createOrder = async (req, res) => {
  const order = await Order.create(req.body);
  res.json(order);
};

exports.updateOrder = async (req, res) => {
  const order = await Order.findByPk(req.params.id);
  await order.update(req.body);
  res.json(order);
};

exports.deleteOrder = async (req, res) => {
  const order = await Order.findByPk(req.params.id);
  await order.destroy();
  res.json({ message: 'Order deleted successfully' });
};

exports.getOrderItemsByOrder = async (req, res) => {
  const orderItems = await OrderItem.findAll({ where: { orderId: req.params.orderId }, include: Product });
  res.json(orderItems);
};