function Node(id, name){
    this.id = id;
    this.name = name;
    this.connections = {};
}
function Graph(){
    this.id = 1;
    this.nodes = [];
    this.add = function(name){
        this.nodes.push(new Node(this.id++, name));
    };
    this.display = function(){
        this.nodes.forEach(function(node){
            console.log(`name: ${node.name}, id: ${node.id}, connections: ${node.connections}`)
        })
    };
    this.find = function(id){
        let result;
        this.nodes.forEach((node)=>{
            console.log(node.id);
            if(node.id == id){
                result = node
            }
        })
        return result;
    }
    this.addConnection = function(id1, id2){
        let node1 = this.find(id1);
        let node2 = this.find(id2);
        if(!node1.connections[id2]){
            node1.connections[id2] = 1;
        } else {
            node1.connections[id2]++;
        }
    };
}
let myGraph = new Graph();
myGraph.add('coffee')
myGraph.add('burgers')
myGraph.add('movie')
let node1 = myGraph.find(1);
console.log(node1);
myGraph.addConnection(1,2);
myGraph.addConnection(1,2);
myGraph.addConnection(1,3);
myGraph.display()