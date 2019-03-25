var express = require('express');
var jsonfile = require('jsonfile');
var helo = require('./helo')
var fs = require('fs');
var router = express.Router();
var helo = require('./helo');
router.get('/', function(req, res, next){
  jsonfile.readFile('./views/ahooo.json',function(err,obj){
  	if(err)console.error(err);
  	obj[0].l = helo.data[1];
  	obj[1].l = helo.data[2];
  	obj[2].l = helo.data[3];
  	obj[3].l = helo.data[4];
  	console.dir(obj.name);
  	res.json(obj);
  	jsonfile.writeFile('./views/ahooo.json', obj, function (err) {
  		if (err) console.error(err)
	});  	
  });
  

});
module.exports = router;