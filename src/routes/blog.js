const express = require('express');
const router = express.Router();
const blog = require('../controllers/blog')

// Create Blog -> POST
router.post('/create-blog', blog.createBlog);

// Read Blog -> GET
router.get('/blog', blog.getAllBlog)

module.exports = router;