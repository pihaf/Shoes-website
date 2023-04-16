const express = require('express');
const router = express.Router();

router.get('/shop', (req, res) => {
  const user = req.user;
  res.status(200).render('shop', { title: 'Shop', user });
});

module.exports = router;