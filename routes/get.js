var express = require('express');
var jsonfile = require('jsonfile');
var helo = require('./helo')
var fs = require('fs');
var router = express.Router();
var helo = require('./helo');
router.get('/', function(req, res, next){
  jsonfile.readFile('./views/ahooo.json',function(err,obj){
  	if(err)console.error(err);
  	for(var i = 0;i<4;i++){
  		obj[i].Lat = helo.data["la" +  (i+1)];
  		obj[i].Lng = helo.data["lo" + (i+1)];
  	}
  	console.dir(obj.name);
  	
  	jsonfile.writeFile('./views/ahooo.json', obj, function (err) {
  		if (err) console.error(err);
	});
	res.json(obj);
  });
  

});
module.exports = router;