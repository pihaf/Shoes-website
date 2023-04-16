const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  const user = req.user;
  res.status(200).render('index', { title: 'Home', user });
});

module.exports = router;