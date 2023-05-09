const express = require('express');
const cors = require('cors')
const authRoutes = require('./src/routes/auth');
const blogRoutes = require('./src/routes/blog')
const bodyParser = require('body-parser');

const app = express();
const port = 3000;


// middleware
app.use(bodyParser.json());
app.use(cors());

// error handling middleware
app.use((err, req, res, next) => {
    console.log(err.stack);
    req.status(500).send('Something broke!')
    next();
})

// app.use('/', blog);
app.use('/v1/auth', authRoutes);
app.use('/v1/blog', blogRoutes);

app.use((error, req, res, next) => {
    const status = error.errorStatus || 500;
    const message = error.message;
    const data = error.data;

    res.status(status).json({message: message, data: data})
})

app.listen(port, () => console.log(`Server started on port ${port}`));