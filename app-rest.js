const express = require('express');
const debug = require('debug')('app-rest');
const morgan = require('morgan');

const app = express();
const port = process.env.PORT || 3000;
app.use(morgan('tiny'));

app.get('/', (req, res) => {
  res.send('hello world');
});

app.listen(port, () => {
  debug(`Node is listening on ${port}`);
});
