const express = require('express');
const router = express.Router();

router.get('/about', (req, res) => {
  const user = req.user;
  res.status(200).render('about', { title: 'About', user });
});

module.exports = router;