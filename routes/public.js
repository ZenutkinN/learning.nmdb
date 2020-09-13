const fs = require('fs');
const path = require('path');

function public(req, res) {
  const pathName = req.url.slice(1);
  const extinsion = path.extname(req.url);
  let contentType = '';

  switch (extinsion) {
    case '.html':
      contentType = 'text/html';
      break;

    case '.css':
      contentType = 'text/css';
      break;

    case '.js':
      contentType = 'text/javascript';
      break;

    case '.png':
      contentType = 'image/png';
      break;

    default:
      contentType = 'text/plain';
      break;
  }

  res.statusCode = 200;
  res.setHeader('Content-Type', contentType);

  const stream = fs.createReadStream(path.resolve('public', pathName));
  stream.pipe(res);

  stream.on('error', (error) => {
    if (error.code === 'ENOENT') {
      res.writeHead(404, { 'Content-Type': contentType });
      res.end('404 Not Found');
    } else {
      res.writeHead(500, { 'Content-Type': contentType });
      res.end(error.message);
    }
  });
}

module.exports = public;
