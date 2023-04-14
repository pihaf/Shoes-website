const Inventory = require('../models/inventory');
const Product = require('../models/products');

exports.getAllInventory = async (req, res) => {
  try {
    const inventory = await Inventory.findAll();
    res.json(inventory);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.getInventoryById = async (req, res) => {
  try {
    const inventory = await Inventory.findByPk(req.params.id);
    res.json(inventory);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.createInventory = async (req, res) => {
  try {
    const inventory = await Inventory.create(req.body);
    res.json(inventory);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.updateInventory = async (req, res) => {
  try {
    const inventory = await Inventory.findByPk(req.params.id);
    await inventory.update(req.body);
    res.json(inventory);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.deleteInventory = async (req, res) => {
  try {
    const inventory = await Inventory.findByPk(req.params.id);
    await inventory.destroy();
    res.json({ message: 'Inventory item deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.getInventoryByProduct = async (req, res) => {
  try {
    const inventory = await Inventory.findAll({ where: { productId: req.params.productId }, include: Product });
    res.json(inventory)
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};