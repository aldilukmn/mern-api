const express = require('express');
const cors = require('cors')
const blog = require('./src/routes/blog')

const app = express();
const port = 3000;


// middleware
app.use(cors());

// error handling middleware
app.use((err, req, res, next) => {
    console.log(err.stack);
    req.status(500).send('Something broke!')
    next();
})

app.use('/', blog)

app.listen(port, () => console.log(`Server started on port ${port}`));