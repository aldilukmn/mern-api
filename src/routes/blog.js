const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blog');
const { body } = require('express-validator');

// Create Blog -> [POST] : /v1/blog/post
router.post('/create-blog', [
            body('title').isLength({min: 5, max: 20}).withMessage('Incorrect title input'),
            body('body').isLength({min: 50, max: 500}).withMessage('Incorrect body input')],         
            blogController.createBlog);

// Read Blog -> [GET] : /v1/blog/get
router.get('/posts', blogController.getBlog);
router.get('/post/:postId', blogController.getBlogPostById);
router.put('/post/:postId', [
            body('title').isLength({min: 5, max: 20}).withMessage('Incorrect title input'),
            body('body').isLength({min: 50, max: 500}).withMessage('Incorrect body input')],
            blogController.updateBlogPost);
router.delete('/post/:postId', blogController.deleteBlogPostbyId)

module.exports = router;