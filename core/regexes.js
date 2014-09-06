var Regex = function (name, sample, regexes) {
    this.name       = name;
    this.sample     = sample;
    this.regexes    = regexes;
}

var list = [];

list.push( new Regex(
    'Style links',
    '<link rel="stylesheet" type="text/css" href="css/reset.css" />',
    ['<link.*href="(.+)".*>']
));

list.push( new Regex(
        'JavaScript links',
        '<script src="js/core.js"></script>',
        ['<script.*src="(.+)".*</script>']
));

list.push( new Regex(
    'node render links',
    'res.render(\'views/index.dust\', model)',
    ['.render.\n(.*)']
));

list.push( new Regex(
    'require render links',
    'res.render(\'views/index.dust\', model)',
    ["require.'(.+.js)'."]
));

module.exports.list = list;