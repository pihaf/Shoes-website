const Inventory = require('../models/inventory');
const Product = require('../models/products');

exports.getAllInventory = async (req, res) => {
  const inventory = await Inventory.findAll();
  res.json(inventory);
};

exports.getInventoryById = async (req, res) => {
  const inventory = await Inventory.findByPk(req.params.id);
  res.json(inventory);
};

exports.createInventory = async (req, res) => {
  const inventory = await Inventory.create(req.body);
  res.json(inventory);
};

exports.updateInventory = async (req, res) => {
  const inventory = await Inventory.findByPk(req.params.id);
  await inventory.update(req.body);
  res.json(inventory);
};

exports.deleteInventory = async (req, res) => {
  const inventory = await Inventory.findByPk(req.params.id);
  await inventory.destroy();
  res.json({ message: 'Inventory item deleted successfully' });
};

exports.getInventoryByProduct = async (req, res) => {
  const inventory = await Inventory.findAll({ where: { productId: req.params.productId }, include: Product });
  res.json(inventory);
};