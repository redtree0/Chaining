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
	console.log(myns);
	const promises = myns.map(getPod);
    await Promise.all(promises).then((data)=>{
        console.log(data);
        callback(data)});

}
async function getPod(ns){

    var pod = await client.api.v1.namespaces(ns).pods.get();
    // console.log(pod.body.items[0].status)
	Promise.resolve(pod.body.items)
}
var controller = {};
controller.getListk8s = function(callback){
    main(callback)
}
module.exports = controller;