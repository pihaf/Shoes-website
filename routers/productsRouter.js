const express = require('express');
const router = express.Router();

const productController = require('../controllers/productsController');

//get request
router.get('/products/:id', productController.getProductById);
router.get('/products/brand/:brand', productController.getProductByBrand);
router.get('/products/category/:category', productController.getProductByCategory);
router.get('/products/name/:name', productController.getProductByName);
router.get('/products/gender/:gender', productController.getProductByGender);
router.get('/api/products', productController.getAllProducts);

//post request
router.post('/products', productController.createProduct);

//put request
router.put('/products/:id', productController.updateProduct);

//delete request
router.delete('/products/:id', productController.deleteProduct);

module.exports = router;