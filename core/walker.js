// dependencies
var fs = require('fs');

// function declarations
var walk = function(dir, done) {
    var results = [];
    fs.readdir(dir, function(err, list) {
        if (err) return done(err);
        var i = 0;
        (function next() {
            var file = list[i++];
            if (!file) return done(null, results);
            file = dir + '/' + file;
            fs.stat(file, function(err, stat) {
                if (stat && stat.isDirectory()) {
                    walk(file, function(err, res) {
                        results = results.concat(res);
                        next();
                    });
                } else {
                    results.push(file);
                    next();
                }
            });
        })();
    });
};

var read = function (path, callback) {
    fs.readFile(path, 'utf8',
        function (err, data) {
        if (err) throw err;
        callback( data.match(/<link.*href.*\/>/g) );
    });
}




// exports
module.exports.walk = walk;
module.exports.read = read;





