const rp          = require('request-promise');

const Kong = require('@pixul/node-kong-api');
var config = {
	url : 'http://192.168.99.20:8001'
}

let kong = new Kong(config);

kong.listApis({}).then(data =>{
	console.log(data);
}).catch(err =>{

});

