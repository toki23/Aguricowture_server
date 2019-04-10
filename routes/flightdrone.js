var express = require('express');
var router = express.Router();
var jsonfile = require('jsonfile');
router.get('/:number', function(req, res, next) {
   jsonfile.readFile('./views/ahooo.json',function(err,obj){
   		res.send(obj[req.params.number-1]);
   	});
});
module.exports = router;