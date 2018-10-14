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

router.get('/node.jsonp', function(req, res, next) {
  controller.getListNode((k8s)=>{
    res.send('sink({"items":'+JSON.stringify(k8s)+'})');
  });
});

router.get('/all.jsonp', function(req, res, next) {
  controller.all((k8s)=>{
    res.send('sink('+JSON.stringify(k8s)+')');
  });
});
router.post('/generate/jupyter', function(req, res, next) {
  // res.json({});
  req.body.app = 'jupyter'
  require('../generator')(req.body, (data)=>{
    res.json(data);
  })
});

router.post('/generate/remix', function(req, res, next) {
  // res.json({});
  req.body.app = 'remix'
  require('../generator')(req.body, (data)=>{
    res.json(data);
  })
});
module.exports = router;
