var express = require('express');
var jsonfile = require('jsonfile');
var fs = require('fs');
var router = express.Router();
var helo = require('./helo');
var json = fs.readFile('./views/ahooo.json',function(err){console.log(err);});
console.log(json);
router.get('/', function(req, res, next) {
  jsonfile.readFile('./views/ahooo.json',function(err,obj){
  	if(err)console.error(err);
  	res.json(obj);
  });
});
module.exports = router;