module.exports = (req, res) => {
  const err = new Error('Not Found');
  err.status = 404;
  res.status(404).json(err);
};
