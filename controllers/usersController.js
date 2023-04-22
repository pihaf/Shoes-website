const User  = require('../models/users');
const bcrypt = require('bcrypt');

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    console.log(user);
    console.log("Req.body from controller:");
    console.log(req.body);
    await user.update({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      username: req.body.username,
      phone_number: req.body.phone_number,
      address: req.body.address,
      others: req.body.others
    });
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.updatePassword = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    console.log(user);
    console.log("Req.body from controller:");
    console.log(req.body);

    if (!req.body.newPassword || !req.body.confirmNewPassword) {
      return res.status(400).json({ message: 'Please provide new password, and confirm new password' });
    }

    //check if the old password matches
    console.log("oldPassword and user password:");
    console.log(req.body.oldPassword);
    console.log(user.password);
    // const isMatch = await bcrypt.compare(req.body.oldPassword, user.password);
    // if (!isMatch) {
    //   return res.status(400).json({ message: 'Invalid old password' });
    // }

    //check if the new password and confirm new password match
    if (req.body.newPassword !== req.body.confirmNewPassword) {
      return res.status(400).json({ message: 'New password and confirm new password do not match' });
    }

    //hash the new password and update the user password
    const hashedPassword = await bcrypt.hash(req.body.newPassword, 10);
    await user.update({
      password: hashedPassword
    });

    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    await user.destroy();
    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};