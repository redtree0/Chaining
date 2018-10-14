const Client = require('kubernetes-client').Client;
const config = require('kubernetes-client').config;

const client = new Client({ config: config.fromKubeconfig(), version: '1.9' });

async function main() {
    const data = await client.api.v1.get();

    console.log(JSON.stringify(data))
}

main()
