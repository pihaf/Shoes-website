const express = require('express');
const router = express.Router();

router.get('/blog', (req, res) => {
  const user = req.user;
  res.status(200).render('blog', { title: 'Blog', user });
});

module.exports = router;