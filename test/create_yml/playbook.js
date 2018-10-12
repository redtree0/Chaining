
var Ansible = require('node-ansible');

var env = {
	'pv' : 'redtree0pv',
	'volume' : 'redtree0v',
	'nfs_path' : '/opt/share/workspace',
	'nfs_master' : '192.168.99.20',
	'namespace' : 'redtree0',
	'pod_name' : 'redtree0ide',
	'password' : '1234',
	'hostPort' : '10000'
}
env.ansible_sudo_pass = "vagrant"

var command = new Ansible.Playbook().playbook('playbook')
				.variables(env);

command.asSudo();
var promise = command.exec();

promise.then((result)=>{
	console.log(result.output);
}).catch((e)=>{
	console.log(e);
});

