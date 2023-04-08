const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local').Strategy;
const { User } = require('../models/users');

const router = express.Router();

//configure passport local strategy
passport.use(new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password'
}, async (username, password, done) => {
  try {
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return done(null, false, { message: 'Incorrect username or password.' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return done(null, false, { message: 'Incorrect username or password.' });
    }
    return done(null, user);
  } catch (err) {
    return done(err);
  }
}));

//configure register route
router.post('/register', async (req, res) => {
  const { name, email, username, password, phone_number, address } = req.body;
  try {
    //check if user with same username already exists
    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already taken.' });
    }
    //create new user
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, username, password: hashedPassword, phone_number, address });
    req.login(user, err => {
      if (err) {
        return res.status(500).json({ message: 'Error logging in.' });
      }
      return res.json(user);
    });
  } catch (err) {
    return res.status(500).json({ message: 'Error registering user.' });
  }
});

//configure login route
router.post('/login', passport.authenticate('local', {
  successReturnToOrRedirect: '/',
  failureRedirect: '/login'
}), (req, res) => {
  res.json(req.user);
});

// configure logout route
router.post('/logout', (req, res) => {
  req.logout();
  req.session.destroy();
  res.json({ message: 'Logged out successfully.' });
});

module.exports = router;