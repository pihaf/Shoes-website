const express = require('express');
const router = express.Router();

const blogController = require('../controllers/blogsController');

const { activeHome, activeShop, activeBlog, activeAbout, activeContact } = require('../helpers/navbarUrlHelpers');

//get request
router.get('/api/blogs', blogController.getAllBlogs);
router.get('/blog/:blogId', blogController.getBlogById);
router.get('/blog', (req, res) => {
  const user = req.user;
  res.status(200).render('blog', { 
    title: 'Blog', 
    user,     
    activeHome: activeHome(req.originalUrl),
    activeShop: activeShop(req.originalUrl),
    activeBlog: activeBlog(req.originalUrl),
    activeAbout: activeAbout(req.originalUrl),
    activeContact: activeContact(req.originalUrl) });
});

//post request
router.post('/blog', blogController.createBlog);

//put request
router.put('/blog/:blogId', blogController.updateBlog);

//delete request
router.delete('/blog/:blogId', blogController.deleteBlog);

module.exports = router;