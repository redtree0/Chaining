const Client = require('kubernetes-client').Client;
const config = require('kubernetes-client').config;

const client = new Client({ config: config.fromKubeconfig(), version: '1.9' });

async function main() {
    const nodes = await client.apis.v1.nodes.get();

    var data ={}
    nodes.body.items.forEach(v=>{

        json = Object.assign({}, v.items);
    
        json = v.items.reduce((json, value, key) => { json[key] = value; return json; }, {});
        delete v['items']

        for(var i in json){
            var tmp = json[i];
            console.log(tmp)
            // tmp.kind = v.kind;
            tmp.kind = "Node";
            tmp.apiVersion = v.apiVersion;
            tmp.metadata = v.metadata;
            key = tmp.metadata.uid || key 
            data[key] = tmp; 

        }
    })

}

main()


