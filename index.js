var finalhandler = require('finalhandler');
var http = require('http');
var serveStatic = require('serve-static');
var colors = require('colors');


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
