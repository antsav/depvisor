// colors
var colors = {
    purl:   '#C7F7EB',
    violet: '#C7CFF7',
    pink:   '#EEC7F7',
    brown:  '#F7D1C6',
    orange: '#F7E8C7',
    yellow: '#F7F2C6',
    green:  '#E8F7C6'
};

var associations = {
    js:     colors.violet,
    json:   colors.pink,
    css:    colors.green,
    dust:   colors.brown,
    other:  colors.purl
}

var nodes = [];

var matchColor = function (path) {
    var color = associations.other;
    Object.keys(associations).forEach(function (key) {
        if (path.split('.').pop() === key) {
            color =  associations[key];
        }
    });
    return color;
};

for (var i = 0; i < backNodes.length ; i+=1){
    nodes.push({
        id: i,
        label: backNodes[i].split('/').pop(),
        color: {
            background: matchColor(backNodes[i])
        }
     });
}

// create a network
var container = document.getElementById('dependencies');
var data = {
    nodes: nodes,
    edges: edges
};
var options = {
    nodes: {
        shape: 'box',
        color: {border: '#ccc'}
    },
    stabilize: false

};
network = new vis.Network(container, data, options);

// add event listener
network.on('select', function(properties) {
    document.getElementById('info').innerHTML += 'selection: ' + JSON.stringify(properties) + '<br>';
});

// set initial selection (id's of some nodes)
network.selectNodes([3, 4, 5]);