/* eslint-disable linebreak-style */
const express = require('express');
const sql = require('mssql');
const debug = require('debug')('app');

const bookRouter = express.Router();

function router(nav) {
  bookRouter.route('/').get((req, res) => {
    res.send(`books route ${nav}`);
  });

  bookRouter.route('/:id').get((req, res) => {
    (async () => {
      const { id } = req.params;
      const request = new sql.Request();

      const { recordset } = await request
        .input('id', sql.Int, id)
        .query('Select * from books where id = @id');
      debug(recordset);
      const booksName = recordset.map(b => b.Title).toString();

      res.send(`books route ${id} ${booksName}`);
    })();
  });
  return bookRouter;
}

module.exports = router;
