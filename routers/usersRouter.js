const express = require('express');
const router = express.Router();

const userController = require('../controllers/usersController');

//get request
router.get('/api/users/:id', userController.getUserById);
router.get('/profile', (req, res) => {
    const user = req.user;
    res.status(200).render('accountSettings', { 
        title: 'Profile', 
        user });
});
router.get('/api/users', userController.getAllUsers);

//post request
router.post('/api/users', userController.createUser);

//put request
router.put('/api/users/:id', userController.updateUser);

//delete request
router.delete('/:id', userController.deleteUser);

module.exports = router;