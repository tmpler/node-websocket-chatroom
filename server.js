var http = require('http');
var fs = require('fs');
var path = require('path');
var mime = require('mime');
var cache = {};
var chatServer = require('./lib/chat_server');

var send404 = function(response){
  response.writeHead(404, {'Content-Type':'text/plain'});
  response.write("Error 404: these are not the resources you're looking for.");
  response.end();
}

var sendFile = function(response, filePath, fileContents){
  response.writeHead(200, {"Content-Type": mime.lookup(path.basename(filePath))});
  response.end(fileContents);
}

var serveStatic = function(response, cache, absPath){
  if(cache[absPath]){
    sendFile(response, absPath, cache[absPath]);
  } else {
    fs.exists(absPath, function(exists){
      if (exists){
        fs.readFile(absPath, function(err, data){
          if(err){
            send404(response);
          } else {
            cache[absPath] = data;
            sendFile(response, absPath, data);
          }
        });
      } else {
        send404(response);
      }
    });
  }
}

var server = http.createServer(function(request,response){
  var filePath = false;

  if(request.url=='/'){
    filePath = 'public/index.html';
  } else {
    filePath = 'public' + request.url;
  }
  var absPath = './' + filePath;
  serveStatic(response, cache, absPath);
});

server.listen(1337, function(){
  console.log("Server listening on the 1337 port!");
});

chatServer.listen(server);
