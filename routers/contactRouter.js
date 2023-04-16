const express = require('express');
const router = express.Router();

router.get('/contact', (req, res) => {
  const user = req.user;
  res.status(200).render('contact', { title: 'Contact', user });
});

module.exports = router;