const fs = require('fs');
const path = require('path');

function render(tempName, data, done) {
  fs.readFile(path.resolve('temp', tempName), 'utf-8', (error, file) => {
    if (error) {
      this.writeHead(500, 'Content-Type', 'text/plane');
      this.end(error.message);
    }

    let html = file;

    if (data) {
      html = file.replace(/{{([^{}]*)}}/g, (fullmatch, group) => {
        const match = data[group];
        return match || fullmatch;
      });
    }

    this.writeHead(200, 'Content-Type', 'text/html');
    this.end(html);
  });
}

module.exports = render;
