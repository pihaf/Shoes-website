const express = require('express');
const router = express.Router();

router.get('/product-details', (req, res) => {
  const user = req.user;
  res.status(200).render('product-details', { title: 'Product details', user });
});

module.exports = router;