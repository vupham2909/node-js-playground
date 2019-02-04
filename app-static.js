const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');
const path = require('path');
const sql = require('mssql');

const bookRouter = require('./src/routes/bookRoutes')(['hello world']);

const app = express();
const port = process.env.PORT || 3000;

const config = {
  user: 'pqvu',
  password: '',
  server: 'vuphamtestdb.database.windows.net', // You can use 'localhost\\instance' to connect to named instance
  database: 'PSLibrary',
  options: {
    encrypt: true, // Use this if you're on Windows Azure
  },
};

sql.connect(config).catch(err => debug(err));

app.use(morgan('tiny'));

app.use((req, rep, next) => {
  debug('my middleware');
  next();
});

app.use(express.static(path.join(__dirname, 'public')));
app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/jquery/dist')));

app.use('/books', bookRouter);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.listen(port, () => {
  debug(`listening on the port ${chalk.green('3000')}`);
});
