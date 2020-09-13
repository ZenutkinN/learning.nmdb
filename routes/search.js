const url = require('url');

const omdb = require('../lib/omdb.js');

function search(req, res) {
  const parsedUrl = url.parse(req.url, true);
  const { title } = parsedUrl.query;

  omdb.get(title, (error, movie) => {
    if (error) {
      res.render('error.html', { error: error.message });
    }

    res.render('movie.html', movie);
  });
}

module.exports = search;
