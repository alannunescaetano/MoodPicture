const http = require('http');
const querystring = require('querystring');
const url = require('url');


const hostname = '192.168.1.184';
const port = 80;

const server = http.createServer(function(req, res) {
  console.log('request received!!!');

  //getting values via GET
  if (req.method == 'GET') {
    const queryObject = url.parse(req.url,true).query;

    //making a response
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('GET REQUEST: The amplitude is '+queryObject.amplitude);

    console.log('GET - Amplitude received: '+ queryObject.amplitude);
  }
  
  //getting values via POST
  if (req.method == 'POST') {
    var body = '';

    req.on('data', function (data) {
        body += data;
    });

    req.on('end', function () {
      console.log('POST received:');
      var amplitudeRecord = JSON.parse(body);

      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/plain');
      res.end('POST REQUEST: MAX amplitude: '+ amplitudeRecord.maxAmplitude +' - AVG amplitude: '+ amplitudeRecord.avgAmplitude);

      console.log('POST REQUEST: MAX amplitude: '+ amplitudeRecord.maxAmplitude +' - AVG amplitude: '+ amplitudeRecord.avgAmplitude);
    });
  }
});

server.listen(port, hostname, function() {
  console.log('The server was turned on. Is ready to receive requests...');
  console.log('Server running at http://'+ hostname + ':' + port + '/');
});