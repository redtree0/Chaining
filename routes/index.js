var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('index', {title : 'express'})
});
router.get('/test', function(req, res, next) {
  res.render('topology-graph', {title : 'express'})
});
var controller = require('../controller');
router.get('/k8s', function(req, res, next) {
    controller.getListk8s((k8s)=>{
      res.json(k8s);
    });
});
module.exports = router;