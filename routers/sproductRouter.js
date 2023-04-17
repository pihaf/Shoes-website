const express = require('express');
const router = express.Router();

router.get('/sproduct', (req, res) => {
  const user = req.user;
  res.status(200).render('sproduct', { title: 'Product info', user });
});

module.exports = router;