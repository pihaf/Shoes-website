const express = require('express');
const router = express.Router();

const brandController = require('../controllers/brandsController');

//get request
router.get('/:id', brandController.getBrandById);
router.get('/', brandController.getAllBrands);

//post request
router.post('/', brandController.createBrand);

//put request
router.put('/:id', brandController.updateBrand);

//delete request
router.delete('/:id', brandController.deleteBrand);

module.exports = router;