var express =   require('express');
var http =      require('http');
var path =      require('path');
var file =      require('file');
var fs =        require('fs');
var _ =         require('underscore');
var colors =    require('colors');  // colors in console )
var walker =    require('./core/walker.js');

var app = express();

app.set('views', __dirname + '/public');
app.engine('ejs', require('ejs').renderFile);
app.set('view engine', 'ejs')
app.use(express.static(__dirname + '/public'));
//app.locals._ = _;

app.get('/', function(req, res){
    res.render('views/index.ejs', {name: 'Sample name'});
})

var server = app.listen(3000, function() {
    console.log('Server started on port '.rainbow, server.address().port);
});









