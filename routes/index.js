var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/auth/info', function(req, res, next) {
  res.json({username:'test',userid:1});
});
module.exports = router;
