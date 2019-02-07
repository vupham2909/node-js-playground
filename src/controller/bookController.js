const debug = require('debug')('app');

function bookController(Book) {
  function get(req, res, next) {
    debug('get books hit');
    const { query } = req;
    Book.find(query, (err, books) => {
      if (err) return next(err);
      return res.json(books);
    });
  }

  function post(req, res) {
    if (!req.body.title) {
      res.status(400);
      return res.send('Title is required');
    }

    const book = new Book(req.body);

    book.save();

    res.status(201);
    return res.json(book);
  }

  function getByIdAll(req, res, next) {
    const { id } = req.params;
    Book.findById(id, (err, book) => {
      if (err) return next(err);
      if (!book) return res.sendStatus(404);

      req.book = book;
      return next();
    });
  }

  function getById(req, res) {
    return res.json(req.book);
  }

  function putById(req, res, next) {
    const { book } = req;
    book.title = req.body.title;
    book.genre = req.body.genre;
    book.author = req.body.author;

    book.save((err) => {
      if (err) next(err);
      return res.json(book);
    });
  }

  function patchById(req, res, next) {
    const { book, body } = req;

    // eslint-disable-next-line no-underscore-dangle
    if (body._id) delete body._id;

    Object.entries(body).forEach((element) => {
      const key = element[0];
      const value = element[1];
      book[key] = value;
    });

    book.save((err) => {
      if (err) return next(err);
      return res.json(book);
    });
  }

  function deleteById(req, res, next) {
    req.book.remove((err) => {
      if (err) return next(err);
      return res.sendStatus(204);
    });
  }
  const obj = {
    get,
    post,
    getByIdAll,
    getById,
    putById,
    patchById,
    deleteById,
  };
  return obj;
}

module.exports = bookController;
