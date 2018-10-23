
var Ansible = require('node-ansible');

var env = {
	'Geth' : {
		'networkId' : 1101,
		'difficulty' : "0x400"
	},
	'Eth_Etherbase' : "0x023e291a99d21c944a871adcc44561a58f99bdbc",
	'Node' : {
		'UserIdent' : 'miner',
		'DataDir' : '/etc/testnet/miner',	
		'Port' : 8545,
		'WsPort' : 8546,
		'DiscoveryAddr' : 30303
	}
}
env.ansible_sudo_pass = "1q2w3e!@#"

var command = new Ansible.Playbook().playbook('playbook')
				.variables(env);

command.asSudo();
var promise = command.exec();

promise.then((result)=>{
	console.log(result.output);
}).catch((e)=>{
	console.log(e);
});

