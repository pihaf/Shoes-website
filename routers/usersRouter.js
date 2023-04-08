const express = require('express');
const router = express.Router();

const userController = require('../controllers/usersController');

//get request
router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);

//post request
router.post('/', userController.createUser);

//put request
router.put('/:id', userController.updateUser);

//delete request
router.delete('/:id', userController.deleteUser);

module.exports = router;