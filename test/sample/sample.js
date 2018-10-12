
var Ansible = require('node-ansible');

var id = "redtree0";
var workspace = "test";
var stub = id + "."+ workspace;

var env = {
	'pv' : stub+'.pv',
	'volume' : stub+'.redtree0v',
	'nfs_path' : '/opt/share/workspace',
	'nfs_master' : '192.168.99.20',
	'namespace' : id,
	'pod_name' : id +'.ide',
	'password' : '1234',
	'hostPort' : '10000'
}
env.ansible_sudo_pass = "1q2w3e!@#"

var command = new Ansible.Playbook().playbook('playbook')
				.variables(env);

command.asSudo();
var promise = command.exec();

const rp          = require('request-promise');

const Kong = require('@pixul/node-kong-api');
var config = {
	url : 'http://192.168.99.20:8001'
}

let kong = new Kong(config);



const Client = require('kubernetes-client').Client;
const config = require('kubernetes-client').config;
const client = new Client({ config: config.fromKubeconfig(), version: '1.9' });

async function main() {
const deployment = await client.apis.apps.v1.namespaces('redtree0').deployments('redtree0').get();

// console.log(deployment.body.spec.template.spec.containers[0].ports[0]);
// console.log(deployment.body.spec.template.spec.containers[0].ports[0].hostPort);
var port = (deployment.body.spec.template.spec.containers[0].ports[0].hostPort);
const pod = await client.api.v1.namespaces('redtree0').pods.get('redtree0');
		// console.log(pod.body.items[0].status.hostIP)
		var host = (pod.body.items[0].status.hostIP)
		
		var api = {
			'name' : id,
			'uris' : '/' + id,
			'methods' : "GET",
			"upstream_url": "http://" + host + ":" + port
		}
	
		kong.addApi(api).then(data =>{
			console.log(data);
		}).catch(err =>{
			console.log(err);
		});
}


promise.then((result)=>{
	console.log(result.output);
	main()
}).catch((e)=>{
	console.log(e);
});

