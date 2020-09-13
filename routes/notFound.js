function notFound(req, res) {
  res.render('error.html', { error: '404 Page Not found' });
}

module.exports = notFound;
