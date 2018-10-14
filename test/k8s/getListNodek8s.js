const Client = require('kubernetes-client').Client;
const config = require('kubernetes-client').config;

const client = new Client({ config: config.fromKubeconfig(), version: '1.9' });

async function main() {
    const nodes = await client.apis.v1.nodes.get();

    var data ={}
    nodes.body.items.forEach(v=>{
	var key = v.metadata.uid || key
	data[key] = v    
    })
    console.log(data)
}

main()


