const http = require('http');
const { omdApiKey } = require('./../config');

function get(title, done) {
  const req = http.get(`http://www.omdbapi.com/?t=${title}&apikey=${omdApiKey}`, (res) => {
    if (res.statusCode !== 200) {
      done(new Error(`Ошибка: ${res.statusMessage} (${res.statusCode})`));
      res.resume();

      return;
    }

    let body = '';

    res.on('data', (data) => (body += data));
    res.on('end', () => {
      let result;

      try {
        result = JSON.parse(body);
      } catch (error) {
        done(error);
      }

      if (result.Response === 'False') return done(new Error(result.Error));

      done(null, result);
    });
  });

  req.on('error', (error) => done(error));
}

module.exports = {
  get,
};
