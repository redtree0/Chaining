const Ansible = require('node-ansible');
const Kong = require('@pixul/node-kong-api');
const Client = require('kubernetes-client').Client;
const config = require('kubernetes-client').config;
const Path = require('path');
module.exports = function(option, callback){

	console.log("onload")
	var id = option.id;
	var workspace = option.ws;
	var stub = id + "-"+ workspace;
	var port = option.port;
	// var id = "redtree0";
	// var workspace = "test";
	// var stub = id + "-"+ workspace;
	// var port = '10000';

	var env = {
		'pv' : stub+'-pv',
		'volume' : stub+'-v',
		'nfs_path' : '/opt/share/'+ id +'/' + workspace,
		'nfs_master' : '192.168.99.20',
		'namespace' : id,
		'pod_name' : id +'-ide',
		'password' : '1234',
		'hostPort' : port,
		'file' : id + '_template.yaml'
	}
	env.ansible_sudo_pass = "1q2w3e!@#"
	// console.log();
	var run_playbook = Path.join(__dirname, 'playbook');
	var command = new Ansible.Playbook().playbook(run_playbook)
					.variables(env);
	command.asSudo();
	// command.inventory('/etc/ansible/hosts')
	var promise = command.exec();


	var kong_config = {
		url : 'http://localhost:8001'
	}

	let kong = new Kong(kong_config);



	

	async function main(callback) {
			const client = new Client({ config: config.fromKubeconfig(), version: '1.9' });

			const deployment = await client.apis.apps.v1.namespaces(id).deployments(pod_name).get();
			// console.log(deployment.body.spec.template.spec.containers[0].ports[0]);
			var port = (deployment.body.spec.template.spec.containers[0].ports[0].hostPort);
			const pod = await client.api.v1.namespaces(id).pods.get(id);
			// console.log(pod.body.items[0].status.hostIP)
			var host = (pod.body.items[0].status.hostIP)
			
			var api = {
				'name' : id,
				'uris' : '/' + id,
				'methods' : "GET",
				"upstream_url": "http://" + host + ":" + port
			}
		
			//kong.addApi(api).then(data =>{
			kong.updateOrCreateApi(api).then(data =>{
				console.log(data);
				callback({'status' : 'success'});
			}).catch(err =>{
				console.log(err);
				callback({'status' : 'error'});
			});
	}

	var spawn = require('child-process-promise').spawn;

	promise.then((result)=>{
		//
		//console.log(result.output);
		return spawn('kubectl', ['create', '-f', env.file], { capture: ['stdout', 'stderr']})
			.then(function(result){
				console.log(result.stdout.toString());
				setTimeout(()=>{
					callback({})
					// main(callback);
				}, 5000);
			})
			.catch(function(err){
				callback({status : 'error'})
				console.log(err);
			});

	}).catch((e)=>{
		callback({status : 'error'})
		console.log(e);
	});

}

