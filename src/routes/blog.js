import express from "express";
import { body } from "express-validator";
import { createBlog, getBlog, getBlogPostById, updateBlogPost, deleteBlogPostbyId } from "../controllers/blog.js";


const router = express.Router();

// Create Blog -> [POST] : /v1/blog/post
router.post('/create-blog', [
            body('title').isLength({min: 5, max: 20}).withMessage('Incorrect title input'),
            body('body').isLength({min: 50, max: 500}).withMessage('Incorrect body input')],         
            createBlog);

// Read Blog -> [GET] : /v1/blog/get
router.get('/posts', getBlog);
router.get('/post/:postId', getBlogPostById);
router.put('/post/:postId', [
            body('title').isLength({min: 5, max: 20}).withMessage('Incorrect title input'),
            body('body').isLength({min: 50, max: 500}).withMessage('Incorrect body input')],
            updateBlogPost);
router.delete('/post/:postId', deleteBlogPostbyId)

export default router;