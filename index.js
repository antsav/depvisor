var express =           require('express');
var async =             require('async');
var http =              require('http');
var path =              require('path');
var file =              require('file');
//var fs =        require('fs');
var dust =              require('dustjs-linkedin');
var cons =              require('consolidate');
var _ =                 require('underscore');
var colors =            require('colors');  // colors in console )
var walker =            require('./core/walker.js');
var lessMiddleware =    require('less-middleware');

var app = express();

// config

app.set('template_engine', 'dust');
app.set('domain', 'localhost');
app.engine('dust', cons.dust);
cons.dust.helpers =     require('dustjs-helpers');
app.set('view engine', 'dust')
app.set('views', __dirname + '/public');

app.use(lessMiddleware(__dirname + '/public'));
app.use(express.static(__dirname + '/public'));

app.locals._ = _;



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
        var assoc = {
            nodes: paths,
            edges: []
        };
        paths.forEach(function (onePath, pathIndex) {
                var linksPathsInFile =  walker.read(onePath);
                linksPathsInFile.forEach(function (fileLink) {
                    var subIndex = walker.pathIndexBySubpath(paths, fileLink);
                    if (subIndex !== undefined){
                        assoc.edges.push({
                            from:   subIndex,
                            to:     pathIndex,
                            style:  'arrow'
                        });
                    }

                });
        });

        console.log('   connections associated'.green);
        callback( null, assoc );
    }
], function( err, model ) {
    if ( err ) {
        console.log( err );
        return;
    }

    console.log(model);

    model.name = 'Dependencies Visualizer',

    app.get('/', function(req, res){
        res.render(
            'views/index.dust',
            model
        )
    });

});

var server = app.listen(8000, function() {
    console.log('Server started on port '.rainbow, server.address().port);
});









