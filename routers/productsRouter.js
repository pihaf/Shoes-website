const express = require('express');
const router = express.Router();

const productController = require('../controllers/productsController');

//get request
router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);
router.get('/brand/:brand', productController.getProductByBrand);
router.get('/category/:category', productController.getProductByCategory);
router.get('/name/:name', productController.getProductByName);

//post request
router.post('/', productController.createProduct);

//put request
router.put('/:id', productController.updateProduct);

//delete request
router.delete('/:id', productController.deleteProduct);

module.exports = router;