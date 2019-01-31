const express = require('express');
const debug = require('debug')('app');

function router(Book) {
  const bookRouter = express.Router();

  bookRouter
    .route('/books')
    .get((req, res) => {
      const { query } = req;
      Book.find(query, (err, books) => {
        if (err) res.status(500).send(err);
        res.json(books);
      });
    })
    .post((req, res) => {
      const book = new Book(req.body);

      book.save();

      res.status(201).json(book);
    });

  bookRouter.route('/books/:id').get((req, res) => {
    const { id } = req.params;
    Book.findById(id, (err, book) => {
      if (err) res.status(500).send(err);
      res.json(book);
    });
  });

  return bookRouter;
}

module.exports = router;
