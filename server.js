const http = require('http');

const {public, home, search, notFound} = require('./routes');
const render = require('./lib/render.js');

http.ServerResponse.prototype.render = render;

http.createServer((req, res) => {

    const url = req.url;

    if (url.match(/\.(html|css|js|png)$/)) {
        public(req, res);
    } else if (url === '/') {
        home(req, res);
    } else if (url.startsWith('/search')) {
        search(req, res);
    } else {
        notFound(req, res);
    };

}).listen(3000, () => console.log('Server is start'));