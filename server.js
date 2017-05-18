var http = require('http');
var fs = require('fs');
var path = require('path');
var mime = require('mime');
var cache = {};

var send404 = function(response){
  response.writeHead(404, {'Content-Type':'text/plain'});
  response.write("Error 404: these are not the resources you're looking for.");
  response.end();
}

var sendFile = function(response, filePath, fileContents){
  response.writeHead(200, {"Content-Type": mime.lookup(path.basename(filePath))});
  response.end(fileContents);
}
