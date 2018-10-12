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

function query(path, method, body){
	let options = {
		uri   : config.url + path,
		method: method,
		body  : body,
		json  : true
	};

	return rp(options);
}
var api = {
	'name' : 'test',
	'protocol' : ['http', 'https'],
	'host' :'nodejs.org',
	'port' :80,
	"protocol": "http"
}
// query('/services/', 'POST', api);

var api = {
	'name' : 'redtree',
	'uris' : '/redtree',
	'methods' : "GET",
	"upstream_url": "http://10.244.2.2:8888"
}

// var api = {
// 	'name' : 'test1',
// 	'uris' : '/test1',
// 	'methods' : "GET",
// 	"upstream_url": "https://docs.konghq.com/0.14.x/admin-api/#add-route"
// }

kong.addApi(api).then(data =>{
	console.log(data);
}).catch(err =>{
	console.log(err);
});

// kong.addApi(api).then(data =>{
// 	console.log(data);
// }).catch(err =>{

// });