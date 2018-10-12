
var Ansible = require('node-ansible');

var command = new Ansible.Playbook().playbook('playbook')
				.variables({hello : "test", ansible_sudo_pass : "1q2w3e!@#" });

command.asSudo();
var promise = command.exec();

promise.then((result)=>{
	console.log(result.output);
}).catch((e)=>{
	console.log(e);
});

