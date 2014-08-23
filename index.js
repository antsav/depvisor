var http = require('http');
var serveStatic = require('serve-static');
var finalhandler = require('finalhandler');
var file = require('file');
var fs = require('fs');

var colors = require('colors');  // colors in console )


var data = [];

//null, dirPath, dirs, files
file.walk('~/projects/sandbox/', function (dirPath, dirs, files) {
//    if (files.indexOf('node_modules') !== -1){
        console.log(files);
//    files.indexOf('node_modules')
    data.push(files);
//    }
});
 data;
// Serve up public/ftp folder
var serve = serveStatic('public', {
    'index' : ['views/index.html']
});

// Create server
var server = http.createServer(function(req, res){
    var done = finalhandler(req, res);
    serve(req, res, done);
});

// Listen
server.listen(3000);
console.log('server started on port 3000'.rainbow);


