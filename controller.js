const Client = require('kubernetes-client').Client;
const config = require('kubernetes-client').config;

const client = new Client({ config: config.fromKubeconfig(), version: '1.9' });

async function main(callback) {
    var ns = await client.api.v1.namespaces.get();
    //console.log(ns.body.items)
    var myns = ns.body.items.filter((item)=>{
	    return (item.metadata.name != 'kube-system' && item.metadata.name != 'kube-public')
    })
	//console.log(myns);
    myns = myns.map((item)=>{
	    return item.metadata.name
    })
console.log("callback")
	//console.log(myns);
	const promises = myns.map(getPod);
    await Promise.all(promises).then((data)=>{
        var data = fileter(data);
        //console.log(data);
        callback(data)});

}
var key = ""
var relations = []
function fileter(before){
    var data ={}
    before.forEach(v=>{
        json = Object.assign({}, v.items);
    
        json = v.items.reduce((json, value, key) => { json[key] = value; return json; }, {});
        delete v['items']

	for(var i in json){
        var tmp = json[i];
	//	console.log(tmp)
        // tmp.kind = v.kind;
        tmp.kind = "Pod";
        tmp.apiVersion = v.apiVersion;
        // console.log(tmp.metadata.uid);
       	key = tmp.metadata.uid || key 
        data[key] = tmp; 
		var link = { 
			'target' : key,
			'source' : data[key].spec.nodeName
		}
		relations.push(link);
	
	}
    })
    return data;
}
async function getPod(ns){

    var pod = await client.api.v1.namespaces(ns).pods.get();
    // console.log(pod.body.items[0].status)
	return Promise.resolve(pod.body)
}
var controller = {};
controller.getListk8s = function(callback){
    main(callback)
}
var nodeMap = new Map()
async function node(callback) {
    const nodes = await client.apis.v1.nodes.get();

    var data ={}
    nodes.body.items.forEach(v=>{
	var key = v.metadata.uid || key
	data[key] = v    
        data[key].kind = "Node";
        data[key].apiVersion = nodes.body.apiVersion;
	nodeMap.set(v.metadata.name, v.metadata.uid)
    })
    //console.log(data)
    callback(data)
		
}
function p(callback){
	return new Promise(function(resolve, reject){
		console.log(callback)
		callback(resolve)	
	})
}
async function all(callback){
var promises = [p(node), p(main)]
    return Promise.all(promises).then((data)=>{
	    var items = Object.assign({},data[0], data[1]);
	    //console.log(result)
	    relations = relations.map((obj)=>{
		    obj.source = nodeMap.get(obj.source) 
		    return obj
	    });

	    var result = {
		'items' : items,
		'relations' : relations
	    }

	    return result 
    })	.then(callback)
	/*
    return new Promise((resolve, reject)=>{
        node((data)=>{resolve(data)})
    }).then((data)=>{
        main((data)=>{ 
		console.log(data)
		console.log("mai")
		resolve(data)})
    }).then((data)=>{
	callback(data)
    });
    */
}

controller.getListNode = function(callback){
    node(callback)
}

controller.all = function(callback){
    all(callback)
}
module.exports = controller;
