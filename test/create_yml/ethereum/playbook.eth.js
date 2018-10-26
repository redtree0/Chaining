'use strict'
var Ansible = require('node-ansible');
const yaml = require('js-yaml');
const fs = require('fs');
const path = require('path');

// console.log(JSON.stringify(yaml.safeLoad(fs.readFileSync('./kuberneteth/kuberneteth.yaml'))));
var object = require('./kuberneteth.json');

// console.log(object);

var tmp = yaml.dump(object, {
    flowLevel: 3,
    styles: {
      '!!int'  : 'hexadecimal',
      '!!null' : 'camelcase'
    }
})
var envfile = 'tmp.yaml';
fs.writeFileSync(envfile, tmp);
// console.log(yaml.dump(object, {
//   flowLevel: 3,
//   styles: {
//     '!!int'  : 'hexadecimal',
//     '!!null' : 'camelcase'
//   }
// }));
let miner_node_toml = (object.nodes).map((val, i)=>{
  return Object.keys(val)[0];
});

// console.log(object.nodes);
// console.log(test);
var env = {
    'user' : {
      'id' : 'linux',
      'type' : 'eth' ,
    },
    'name' : 'test',
    'workdir' : '../user',
  
}

let config = getConfig(env);

function getConfig(config){
  if(config !== null && typeof config === 'object'){
    let result = config;
    let prefix = '_';
    let miner_node_toml = (object.nodes).map((val, i)=>{
      let stub = config.user.id + '-' + config.user.type ;
      return (stub + Object.keys(val)[0] + ".yaml");
      // return path.join(stub, Object.keys(val)[0] + ".yaml");
    });
    result.path = path.join(config.workdir, config.name); 

    result.meta = {
      'eth' : config.user.id + '-' + config.user.type + prefix + 'eth-config.yaml',
      'k8s' : config.user.id + '-' + config.user.type + prefix + 'k8s.yaml',
      'toml' : miner_node_toml
    }
    return result;
  }
  return {};
}

console.log(config);

env.ansible_sudo_pass = "1q2w3e!@#"
// env.ansible_sudo_pass = "vagrant"

// var command = new Ansible.Playbook().playbook('playbook')
// 				.variables(env);

// // command.asSudo();
// var promise = command.exec();

// promise.then((result)=>{
// 	console.log(result.output);
// }).catch((e)=>{
// 	console.log(e);
// });

