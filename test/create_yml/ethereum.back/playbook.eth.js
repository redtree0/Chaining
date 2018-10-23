
var Ansible = require('node-ansible');
const fs =require('fs');

var env = {
	'config' : {
		'keystore' : {
			'name' : 'UTC--2017-04-06T08-30-06.659191254Z--023e291a99d21c944a871adcc44561a58f99bdbc'
		}
	},
	'include_file' : function(path){
		return fs.readFileSync(path);
	}
}
env.ansible_sudo_pass = "1q2w3e!@#"

var command = new Ansible.Playbook().playbook('playbook.eth')
				.variables(env);

command.asSudo();
var promise = command.exec();

promise.then((result)=>{
	console.log(result.output);
}).catch((e)=>{
	console.log(e);
});

