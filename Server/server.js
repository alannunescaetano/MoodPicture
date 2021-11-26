const http = require('http');
const querystring = require('querystring');
const url = require('url');

const hostname = '10.72.121.155';
const port = 80;

const server = http.createServer(function(req, res) {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World\n');

  const queryObject = url.parse(req.url,true).query;
  console.log(queryObject);
});

server.listen(port, hostname, function() {
  console.log('Server running at http://'+ hostname + ':' + port + '/');
});