var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('index', {title : 'express'})
});
router.get('/test', function(req, res, next) {
  res.render('topology-graph', {title : 'express'})
});
module.exports = router;