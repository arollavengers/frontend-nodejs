var http = require('http'),
    conf = require('nconf');

// Utility function
var stringify = function(input, indent) {
    return JSON.stringify(input, null, indent||"    ");
};

// Utility function
var starts_with = function(string, prefix) {
  return string.lastIndexOf(prefix, 0) === 0; 
};

// https://github.com/flatiron/nconf
//
// Setup nconf to use (in-order):
//   1. Command-line arguments
//   2. A file located at 'path/to/config.json'
//
conf.argv()
    .file({ file: 'conf/config.json' });

// Create an http server that
// 1. handles the  /favicon.ico query
// 2. redirects any request on static resources (prefixed by 'static/')
//    to resource  based on 'statics_dir' folder content
// 3. proxy all other requests to the backend...
//
http.createServer(function(request, response) {

  var request_url = request.url;

  if("/favicon.ico" === request_url) {
    response.writeHead(404);
    response.end();
  }
  else if(starts_with(request_url, "static/")) {
    response.writeHead(404);
    response.end(); 
  }
  else {
    var options = {
      host: conf.get("backend:host"),
      port: conf.get("backend:port"),
      path: conf.get("backend:path") + request_url,
      method: request.method
    };

    console.log("Received request: " + request_url + "\n" +
                "> method........: " + request.method + "\n" +
                "> headers.......: " + stringify(request.headers) + "\n" +
                "Backend:\n" +
                "> options.......: " + stringify(options));

    var proxy_request = http.request(options, function(res) {
      console.log('STATUS: ' + res.statusCode);
      console.log('HEADERS: ' + JSON.stringify(res.headers));
      res.setEncoding('utf8');
      res.on('data', function (chunk) {
        //console.log('BODY: ' + chunk);
        response.write(chunk, 'binary');
      });
      res.on('end', function() {
        response.end();
      })
      response.writeHead(res.statusCode, res.headers);
    });
    proxy_request.on('error', function(what) {
      console.log(what);
    });
    
    request.on('data', function(chunk) {
      proxy_request.write(chunk, 'binary');
    });
    request.on('end', function() {
      proxy_request.end();
    });
  }
}).listen(conf.get("server_port"));

console.log("Server started on " + conf.get("server_port"));