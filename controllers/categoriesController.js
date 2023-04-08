const Category = require('../models/categories');

exports.getAllCategories = async (req, res) => {
  const categories = await Category.findAll();
  res.json(categories);
};

exports.getCategoryById = async (req, res) => {
  const category = await Category.findByPk(req.params.id);
  res.json(category);
};

exports.createCategory = async (req, res) => {
  const category = await Category.create(req.body);
  res.json(category);
};

exports.updateCategory = async (req, res) => {
  const category = await Category.findByPk(req.params.id);
  await category.update(req.body);
  res.json(category);
};

exports.deleteCategory = async (req, res) => {
  const category = await Category.findByPk(req.params.id);
  await category.destroy();
  res.json({ message: 'Category deleted successfully' });
};