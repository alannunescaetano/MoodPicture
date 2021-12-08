const http = require('http');
const querystring = require('querystring');
const url = require('url');
let dbManager = require('./persistence/dbManager.js');
let repository = require('./persistence/sensorReadingsRepository.js');


const hostname = '192.168.1.19';
const port = 80;

const server = http.createServer(function(request, response) {
  if (request.method == 'GET') {
    handleGETRequest(request.url, response);
  }
  
  if (request.method == 'POST') {
    handlePOSTRequest(request, response);
  }
});

server.listen(port, hostname, function() {
  console.log('The server was turned on. Is ready to receive requests...');
  console.log('Server running at http://'+ hostname + ':' + port + '/');

  dbManager.createDatabaseIfNotExists();
});

function handlePOSTRequest(request, response) {
  var body = '';

  request.on('data', function (data) {
      body += data;
  });

  request.on('end', function () {
    console.log(body);
    var reading = JSON.parse(body);

    repository.addReading(reading);

    response.statusCode = 200;
    response.end();
  });
}

function handleGETRequest(urlString, response) {
  const queryObject = url.parse(urlString, true).query;

  console.log(queryObject.sessionId);

  repository.getSensorReadings(queryObject.sessionId, (captureSession) => {
    response.writeHead(200, {'Content-Type': 'text/plain'});
    response.write(JSON.stringify(captureSession));
    response.statusCode = 200;
    response.end();
  });
}