var express =   require('express');
var async =     require('async');
var http =      require('http');
var path =      require('path');
var file =      require('file');
//var fs =        require('fs');
var dust =      require('dustjs-linkedin');
var cons =      require('consolidate');
var _ =         require('underscore');
var colors =    require('colors');  // colors in console )
var walker =    require('./core/walker.js');

var app = express();

// config
app.set('template_engine', 'dust');
app.set('view engine', 'dust')
app.set('domain', 'localhost');
app.set('views', __dirname + '/public');
app.engine('dust', cons.dust);
app.use(express.static(__dirname + '/public'));
app.locals._ = _;


var DIRECTORY = '/Users/anton/PROJECTS/depvisor';



// queries through waterfall
async.waterfall([
    function( callback ) {
        walker.walk(__dirname, function(err, results) {
            if (err) throw err;
            var collector = [];
            results.forEach(function (result) {
                var a = result.match(/(.idea|.git|node_modules)/);
                if (a === null) {
                    collector.push(result);
                }
            });
            console.log('   files paths collected'.green);
            callback(null, collector);
        });
    },
    function( paths, callback ) {

        var readingFile = 'public/views/index.dust';
        walker.read(readingFile, function (result) {

            var data = {
                nodes: paths,
                edges: result
            }
            console.log('   connections associated'.green);
            callback( null, data );
        });

    }
], function( err, result ) {
    if ( err ) {
        console.log( err );
        return;
    }
    console.log( result );


    ////////

    var model = {
        name: 'Dependencies visualizer',
        nodes: result.nodes,
        edges: result.edges
    };

    app.get('/', function(req, res){
        res.render(
            'views/index.dust',
            model
        )
    });

    ///////


});



var server = app.listen(8000, function() {
    console.log('Server started on port '.rainbow, server.address().port);
});









