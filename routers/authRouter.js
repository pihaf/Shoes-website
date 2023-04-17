const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/users');

const router = express.Router();

//configure register route
router.get('/login', (req, res) => {
  res.status(200).render("login&register", { title: 'Login'});
});

router.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect('/');
  });
});

router.post('/register', async (req, res) => {
  console.log(req.body)
  const { name, email, username, password, phone_number = 'N/A', address = 'N/A'} = req.body;
  try {
    //validate form data
    if (!name || !email || !username || !password || !phone_number || !address) {
      return res.render('login&register', { registerErr: 'Please fill in all fields.' });
    }
    //check if user with same username already exists
    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      return res.render('login&register', { registerErr: 'Username already taken.' });
    }
    //create new user
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, username, password: hashedPassword, phone_number, address });
    req.login(user, err => {
      if (err) {
        return res.render('login&register', { registerErr: 'Error logging in.' });
      }
      res.redirect('/');
    });
  } catch (err) {
    console.error(err);
    return res.render('login&register', { registerErr: 'Error registering user.' });
  }
});

//configure login route
router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      console.log(info.message); //debug statement
      return res.render('login&register', { error: 'Invalid username or password.' });
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      req.user = user; //set req.user variable
      return res.redirect('/');
    });
  })(req, res, next);
});

//configure logout route
router.post('/logout', (req, res) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect('/');
  });
});

module.exports = router;