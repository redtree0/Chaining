var test = require('./test.json');

// console.log(test);
var data ={}
test.forEach(v=>{
    // console.log(v)
    json = Object.assign({}, v.items);
   
    json = v.items.reduce((json, value, key) => { json[key] = value; return json; }, {});
    delete v['items']
    // console.log(json[0])
    var tmp = json[0];
    // tmp.kind = v.kind;
    tmp.kind = "Pod";
    tmp.apiVersion = v.apiVersion;
    // console.log(tmp.metadata.uid);
    
    data[tmp.metadata.uid] = tmp; 
    // console.log(data);
    // v.items.forEach(e=>{
    //     console.log(e)
    // })
})
console.log(JSON.stringify(data));
