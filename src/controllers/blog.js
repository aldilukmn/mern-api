exports.createBlog = (req, res, next) => {
    res.json(
        {
            message: 'Create Blog Success',
            data: {
                id: 1,
                name: 'Aldi Lukman',
                tag: 'aldilukmn'
            }
        }
    );
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