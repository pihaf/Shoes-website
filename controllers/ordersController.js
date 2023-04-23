const Order = require('../models/orders');
const OrderItem = require('../models/orderItems');
const Product = require('../models/products');

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.findAll();
    res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id, { include: OrderItem });
    res.json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.createOrder = async (req, res) => {
  try {
    const order = await Order.create(req.body);
    res.json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.updateOrder = async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id);
    await order.update(req.body);
    res.json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id);
    await order.destroy();
    res.json({ message: 'Order deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.createOrderItem = async (req, res) => {
  try {
    console.log("Logged from createOrderItem:");
    console.log('req.body:', req.body);
    const order = await Order.findByPk(req.params.orderId);
    console.log('order:', order);
    for (const item of req.body) {
      const product = await Product.findByPk(item.product_id);
      const orderItem = await OrderItem.create({
        order_id: order.id,
        product_id: product.id,
        size: item.size,
        quantity: item.quantity,
        price: product.price
      });
    }
    res.json({ message: 'Order items added to database'});
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.updateOrderItem = async (req, res) => {
  try {
    const orderItem = await OrderItem.findByPk(req.params.orderItemId);
    await orderItem.update(req.body);
    res.json(orderItem);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.deleteOrderItem = async (req, res) => {
  try {
    const orderItem = await OrderItem.findByPk(req.params.orderItemId);
    await orderItem.destroy();
    res.json({ message: 'Order item deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.getOrderItemsByOrder = async (req, res) => {
  try {
    const orderItems = await OrderItem.findAll({ where: { orderId: req.params.orderId }, include: Product });
    res.json(orderItems);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};