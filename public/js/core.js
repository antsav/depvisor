
//  an array with nodes
var nodes = [
//
//    {id: 1, label: '{name}', color:{background: '#ccc'}},
//    {id: 2, label: 'Node 2'},
//    {id: 3, label: 'Node 3'},
//    {id: 4, label: 'Node 4'},
//    {id: 5, label: 'Node 5'}
];

for (var i = 0; i < backModelFiles.length ; i+=1){
    nodes.push(
        {
            id: i,
            label: backModelFiles[i].split('/').pop()
        })
}

// create an array with edges
var edges = [
    {from: 1, to: 2},
    {from: 1, to: 3},
    {from: 2, to: 4},
    {from: 2, to: 5}
];

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