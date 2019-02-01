/* eslint-disable no-param-reassign */
const express = require('express');
const debug = require('debug')('app');

function router(Book) {
  const bookRouter = express.Router();

  bookRouter
    .route('/books')
    .get((req, res) => {
      const { query } = req;
      Book.find(query, (err, books) => {
        if (err) return res.status(500).send(err);
        return res.json(books);
      });
    })
    .post((req, res) => {
      const book = new Book(req.body);

      book.save();

      res.status(201).json(book);
    });
  bookRouter.use('/books/:id', (req, res, next) => {
    const { id } = req.params;
    Book.findById(id, (err, book) => {
      if (err) return res.status(500).send(err);
      if (!book) return res.sendStatus(404);

      req.book = book;
      return next();
    });
  });
  bookRouter
    .route('/books/:id')
    .get((req, res) => res.json(req.book))
    .put((req, res) => {
      const { book } = req;
      book.title = req.body.title;
      book.genre = req.body.genre;
      book.author = req.body.author;

      book.save((err) => {
        if (err) return res.status(500).send(err);
        return res.json(book);
      });

      return res.send(book);
    })
    .patch((req, res) => {
      const { book, body } = req;

      // eslint-disable-next-line no-underscore-dangle
      if (body._id) delete body._id;

      Object.entries(body).forEach((element) => {
        const key = element[0];
        const value = element[1];
        book[key] = value;
      });

      book.save((err) => {
        if (err) return res.status(500).send(err);
        return res.json(book);
      });
    })
    .delete((req, res) => {
      req.book.remove((err) => {
        if (err) return res.status(500).send(err);
        return res.sendStatus(204);
      });
    });

  return bookRouter;
}

module.exports = router;
