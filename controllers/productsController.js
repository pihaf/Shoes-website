const Product  = require('../models/products');
const Brand  = require('../models/brands');
const Category = require('../models/categories');

exports.getAllProducts = async (req, res) => {
  const products = await Product.findAll();
  res.json(products);
};

exports.getProductById = async (req, res) => {
  const product = await Product.findByPk(req.params.id);
  res.json(product);
};

exports.createProduct = async (req, res) => {
  const product = await Product.create(req.body);
  res.json(product);
};

exports.updateProduct = async (req, res) => {
  const product = await Product.findByPk(req.params.id);
  await product.update(req.body);
  res.json(product);
};

exports.deleteProduct = async (req, res) => {
  const product = await Product.findByPk(req.params.id);
  await product.destroy();
  res.json({ message: 'Product deleted successfully' });
};

exports.getProductByBrand = async (req, res) => {
  const brand = await Brand.findOne({ where: { name: req.params.brand } });
  const products = await Product.findAll({ where: { brandId: brand.id } });
  res.json(products);
};

exports.getProductByName = async (req, res) => {
  const products = await Product.findAll({ where: { name: req.params.name } });
  res.json(products);
};

exports.getProductByCategory = async (req, res) => {
  const category = await Category.findOne({where: {name: req.params.category}})
  const products = await Product.findAll({ where: { categoryId: category.id } });
  res.json(products);
}