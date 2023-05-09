const { validationResult } = require("express-validator");

exports.createBlog = (req, res, next) => {
    const {title, image, body} = req.body;
    const error = validationResult(req);
    if (!error.isEmpty()) {
        const err = new Error('Incorrect value input');
        err.errorStatus = 400;
        err.data = error.array();
        throw err;
    }
    const result = {
        message: "Create Blog Post Success",
        data: {
            post_id: 1,
            title: title,
            image: image,
            body: body,
            create_at: "23/04/2023",
            author: {
                user_id: 1,
                name: "aldi"
            }
        }
    }
    res.status(201).json(result);
    next();
}

exports.getAllBlog = (req, res, next) => {
    res.json(
        {
            message: 'Get All Blog Success',
            data: [
                {
                    id: 1,
                    name: 'Aldi Lukman',
                    tag: 'aldilukmn'
                }
            ]
        }
    )
}