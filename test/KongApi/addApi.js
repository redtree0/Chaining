const rp          = require('request-promise');

const Kong = require('@pixul/node-kong-api');
var config = {
	url : 'http://192.168.99.20:8001'
}

let kong = new Kong(config);

function query(path, method, body){
	let options = {
		uri   : config.url + path,
		method: method,
		body  : body,
		json  : true
	};

	return rp(options);
}
// query('/services/', 'POST', api);

var api = {
	'name' : 'test',
	'uris' : '/test',
	'methods' : "GET",
	"upstream_url": "http://nodejs.org"
}


kong.addApi(api).then(data =>{
	console.log(data);
}).catch(err =>{
	console.log(err);
});

