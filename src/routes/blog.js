const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blog');
const { body } = require('express-validator');

// Create Blog -> [POST] : /v1/blog/post
router.post('/create-blog', [
            body('title').isLength({min: 5, max: 20}).withMessage('Incorrect title input'),
            body('body').isLength({min: 50, max: 500}).withMessage('Incorrect body input')],         
            blogController.createBlog);

// Read Blog -> GET
router.get('/blog', blogController.getAllBlog)

module.exports = router;