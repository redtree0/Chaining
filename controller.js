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
	//console.log(myns);
	const promises = myns.map(getPod);
    await Promise.all(promises).then((data)=>{
        //console.log(data);
        var data = fileter(data);
        callback(data)});

}
var key = ""
function fileter(before){
    var data ={}
    before.forEach(v=>{
        json = Object.assign({}, v.items);
    
        json = v.items.reduce((json, value, key) => { json[key] = value; return json; }, {});
        delete v['items']

	for(var i in json){
        var tmp = json[i];
		console.log(tmp)
        // tmp.kind = v.kind;
        tmp.kind = "Pod";
        tmp.apiVersion = v.apiVersion;
        // console.log(tmp.metadata.uid);
       	key = tmp.metadata.uid || key 
        data[key] = tmp; 

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
async function node() {
    const nodes = await client.apis.v1.nodes.get();

    var data ={}
    nodes.body.items.forEach(v=>{
	var key = v.metadata.uid || key
	data[key] = v    
    })
    console.log(data)
}

controller.getListNode = function(callback){
    node(callback)
}
module.exports = controller;
