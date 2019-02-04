const router = require('express').Router();
const Book = require('../models/bookModel');
const bookRouter = require('./bookRoutes')(Book);

router.use('/books', bookRouter);

module.exports = router;
