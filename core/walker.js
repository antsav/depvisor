




var collector = [];

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

walk('/Users/asavinskiy/projects/sandbox', function(err, results) {
    if (err) throw err;
    results.forEach(function (result) {
        var a = result.match(/(.idea|.git|node_modules)/);
        if (a === null) {
            collector.push(result);
//            console.log(typeof result);
        }
    });
//    console.log(collector);

});

collector.push(2,3,4)

console.log(collector);