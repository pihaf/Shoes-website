const Product  = require('../models/products');
const Brand  = require('../models/brands');
const Category = require('../models/categories');

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll({
      include: [Brand, Category]
    });
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    res.json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    await product.update(req.body);
    res.json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    await product.destroy();
    res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.getProductByBrand = async (req, res) => {
  try {
    const brand = await Brand.findOne({ where: { name: req.params.brand } });
    const products = await Product.findAll({ where: { brandId: brand.id } });
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.getProductByName = async (req, res) => {
  try {
    const products = await Product.findAll({ where: { name: req.params.name } });
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.getProductByCategory = async (req, res) => {
  try {
    const category = await Category.findOne({where: {name: req.params.category}});
    const products = await Product.findAll({ where: { categoryId: category.id } });
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
}

exports.getProductByGender = async (req, res) => {
  try {
    const products = await Product.findAll({ where: { gender: req.params.gender }});
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
}
