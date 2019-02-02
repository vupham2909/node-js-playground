function bookController(Book) {
  function get(req, res) {
    const { query } = req;
    Book.find(query, (err, books) => {
      if (err) return res.status(500).send(err);
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

  return {
    get,
    post,
  };
}

module.exports = bookController;
