var express = require('express');
var jsonfile = require('jsonfile');
var router = express.Router();
router.get('/', function(req, res, next){
  jsonfile.readFile('./views/ahooo.json',function(err,obj){
  		res.json(obj);
  });
  
});
module.exports = router;