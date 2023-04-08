const Brand = require('../models/brands');

exports.getAllBrands = async (req, res) => {
  const brands = await Brand.findAll();
  res.json(brands);
};

exports.getBrandById = async (req, res) => {
  const brand = await Brand.findByPk(req.params.id);
  res.json(brand);
};

exports.createBrand = async (req, res) => {
  const brand = await Brand.create(req.body);
  res.json(brand);
};

exports.updateBrand = async (req, res) => {
  const brand = await Brand.findByPk(req.params.id);
  await brand.update(req.body);
  res.json(brand);
};

exports.deleteBrand = async (req, res) => {
  const brand = await Brand.findByPk(req.params.id);
  await brand.destroy();
  res.json({ message: 'Brand deleted successfully' });
};