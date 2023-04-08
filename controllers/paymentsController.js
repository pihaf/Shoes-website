const Payment = require('../models/payments');
const Order = require('../models/orders');

exports.getAllPayments = async (req, res) => {
  const payments = await Payment.findAll();
  res.json(payments);
};

exports.getPaymentById = async (req, res) => {
  const payment = await Payment.findByPk(req.params.id);
  res.json(payment);
};

exports.createPayment = async (req, res) => {
  const payment = await Payment.create(req.body);
  res.json(payment);
};

exports.updatePayment = async (req, res) => {
  const payment = await Payment.findByPk(req.params.id);
  await payment.update(req.body);
  res.json(payment);
};

exports.deletePayment = async (req, res) => {
  const payment = await Payment.findByPk(req.params.id);
  await payment.destroy();
  res.json({ message: 'Payment deleted successfully' });
};

exports.getPaymentsByOrder = async (req, res) => {
  const payments = await Payment.findAll({ where: { orderId: req.params.orderId }, include: Order });
  res.json(payments);
};