const express = require('express');
const debug = require('debug')('app');
const morgan = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Book = require('./src/models/bookModel');

const db = mongoose.connect('mongodb://localhost/bookAPI', { useNewUrlParser: true });

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('tiny'));

const bookRouter = require('./src/routes/bookRoutes')(Book);

app.use('/api', bookRouter);

app.server = app.listen(port, () => {
  debug(`Node is listening on ${port} `);
});

module.exports = app;
