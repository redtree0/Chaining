const Client = require('kubernetes-client').Client;
const config = require('kubernetes-client').config;

const client = new Client({ config: config.fromKubeconfig(), version: '1.9' });

async function main() {
    const deployment = await client.apis.apps.v1.namespaces('redtree0').deployments('redtree0-ide').get();


    // console.log(deployment.body.spec.template.spec.containers[0].ports[0]);
    //console.log(deployment.body.spec.template.spec.containers[0].ports[0].hostPort);
    var port = (deployment.body.spec.template.spec.containers[0].ports[0].hostPort);
    const pod = await client.api.v1.namespaces('redtree0').pods.get('redtree0');
    //console.log(pod.body.items[0].status.hostIP)
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
	await Promise.all(promises);

}
async function getPod(ns){

    var pod = await client.api.v1.namespaces(ns).pods.get();
    console.log(pod.body.items[0].status)
}

main()


