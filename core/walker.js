// dependencies
var fs =        require('fs');
var regexes =   require('../core/regexes');

// operating functions
var sharedSubstring = function (array){
    var A= array.slice(0).sort(),
        word1= A[0], word2= A[A.length-1],
        L= word1.length, i= 0;
    while(i<L && word1.charAt(i)=== word2.charAt(i)) i++;
    return word1.substring(0, i);
}


// exporting functions
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
    var linksPathsInFile = [];
    fs.readFile(path, 'utf8',
        function (err, data) {
            if (err) throw err;

            regexes.list.forEach(function (regString) {
                var regex = new RegExp(regString, 'g');
                var linksCollection = data.match(regex);

                if (linksCollection !== null) {
                    linksCollection.forEach(function (eachOccurance) {
                        var rege = new RegExp( regex.toString().replace('/', '').replace('/g', '') );
                        linksPathsInFile.push(eachOccurance.match(rege)[1]);
                    });
                } // if (linksCollection !== null) {
            }); // regexes.list.forEach(function (regString) {

            callback(linksPathsInFile); // outputing on read complete

        }); //fs.readFile(path, 'utf8',
} // var read


var pathIndexBySubpath = function (paths, subpath) {
//    console.log(paths[5].indexOf(subpath));
//    console.log(subpath);

    paths.forEach(function (singlePath, singlePathIndex) {
//        console.log(singlePath.indexOf(subpath), singlePathIndex);

        if (singlePath.indexOf(subpath) !== -1) {
            return singlePathIndex;
        }
    });

} // var pathIndexByName

// exports
module.exports.walk = walk;
module.exports.read = read;
module.exports.pathIndexBySubpath = pathIndexBySubpath;






