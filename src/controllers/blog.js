const { validationResult } = require("express-validator");
const blogPost = require('../models/blog');
const path = require('path');
const fs = require('fs');

exports.createBlog = (req, res, next) => {
    const error = validationResult(req);

    // Validator
    if (!error.isEmpty()) {
        const err = new Error('Incorrect value input');
        err.errorStatus = 400;
        err.data = error.array();
        throw err;
    }

    if (!req.file) {
        const err = new Error('Image must be uploaded');
        err.errorStatus = 422;
        throw err;
    }

    const {title, body} = req.body;
    const image = req.file.path;

    const posting = new blogPost({
        title: title,
        image: image,
        body: body,
        author: {uid: 1, name: 'Aldi Lukman'}
    });

    posting.save()
    .then(result => {
        const response = {
            message: "Create Blog Post Success",
            data: result
        }
        res.status(201).json(response);
    })
    .catch(err => {
        console.log('error : ', err)
    });
}

exports.getBlog = (req, res, next) => {
    const currentPage = req.query.page || 1;
    const perPage = req.query.perPage || 5;
    let totalItem;

    blogPost.find()
    .countDocuments()
    .then(count => {
        totalItem = count;
        return blogPost.find()
        .skip((currentPage - 1) * perPage)
        .limit(perPage);
    })
    .then(result => {
        res.status(200).json({
            message: 'Blog post successfully retrieved',
            data: result,
            total_data: totalItem,
            per_page: parseInt(perPage),
            current_page: parseInt(currentPage),
        })
    })
    .catch(err => {
        next(err);
    })
}

exports.getBlogPostById = (req, res, next) => {
    const postId = req.params.postId;
    blogPost.findById(postId)
    .then(result => {
        if(!result) {
            const error = new Error('Blog post not found');
            error.errorStatus = 404;
            throw error;
        }
        res.status(200).json({
            message: 'Blog post found',
            data: result,
        })
    })
    .catch(err => {
        next(err);
    })
}

exports.updateBlogPost = (req, res, next) => {
    const error = validationResult(req);

    // Validator
    if (!error.isEmpty()) {
        const err = new Error('Incorrect value input');
        err.errorStatus = 400;
        err.data = error.array();
        throw err;
    }

    if (!req.file) {
        const err = new Error('Image must be uploaded');
        err.errorStatus = 422;
        throw err;
    }

    const {title, body} = req.body;
    const image = req.file.path;
    const postId = req.params.postId;

    blogPost.findById(postId)
    .then(post => {
        if (!post) {
            const error = new Error('Blog post not found');
            error.errorStatus = 404;
            throw error;
        }
        post.title = title;
        post.image = image;
        post.body = body;

        return post.save();
    })
    .then(result => {
        res.status(200).json({
            message: "Update successful",
            data: result,
        })
    })
    .catch(err => {
        next(err);
    })
}

exports.deleteBlogPostbyId = (req, res, next) => {
    const postId = req.params.postId;
    blogPost.findById(postId)
    .then(post => {
        if (!post) {
            const error = new Error('Blog post not found');
            error.errorStatus = 404;
            throw error;
        }

        removeImage(post.image);
        return blogPost.findByIdAndRemove(postId);
    })
    .then(result => {
        res.status(200).json({
            message: "Blog post successfully deleted",
            data: result
        })
    })
    .catch(err => {
        next(err);
    })
}

const removeImage = (filePath) => {
    filePath = path.join(__dirname, '../../', filePath);
    fs.unlink(filePath, err => {
        if (err) {
            console.log('Error removing image :', err)
        } else {
            console.log('Image removed successfully');
        }
    });
};