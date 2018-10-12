var express = require('express');
var router = express.Router();
// var generator = ;

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('index', {title : 'express'})
});
router.get('/test', function(req, res, next) {
  res.render('topology-graph', {title : 'express'})
});
var controller = require('../controller');
router.get('/k8s.jsonp', function(req, res, next) {
    controller.getListk8s((k8s)=>{
      res.send('sink({"items":'+JSON.stringify(k8s)+'})');
    });
});
router.post('/generate', function(req, res, next) {
  // res.json({});
  require('../generator')(req.body, (data)=>{
    res.json(data);
  })
});
module.exports = router;
