/* eslint-disable no-param-reassign */
const express = require('express');
const bookController = require('../controller/bookController');

function router(Book) {
  const bookRouter = express.Router();
  const controller = bookController(Book);

  bookRouter
    .route('/')
    .get(controller.get)
    .post(controller.post);

  bookRouter
    .route('/:id')
    .all(controller.getByIdAll)
    .get(controller.getById)
    .put(controller.putById)
    .patch(controller.patchById)
    .delete(controller.deleteById);

  return bookRouter;
}

module.exports = router;
