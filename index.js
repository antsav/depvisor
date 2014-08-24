var express =   require('express');
var http =      require('http');
var path =      require('path');
var file =      require('file');
var fs =        require('fs');
var colors =    require('colors');  // colors in console )

var app = express();

app.set('views', __dirname + '/public/views');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html')

app.get('/', function(req, res){
    res.render('index.html');
})

var server = app.listen(3000, function() {
    console.log('Server started on port '.rainbow, server.address().port);
});









