const express = require('express');
const router = express.Router();

const categoryController = require('../controllers/categoriesController');

//get request
router.get('/:id', categoryController.getCategoryById);
router.get('/', categoryController.getAllCategories);

//post request
router.post('/', categoryController.createCategory);

//put request
router.put('/:id', categoryController.updateCategory);

//delete request
router.delete('/:id', categoryController.deleteCategory);

module.exports = router;