var express = require('express');
var fs = require('fs');
var router = express.Router();
var jsonfile = require('jsonfile');
router.get('/', function(req, res, next) {
    res.render('helo');
});
router.post('/', function(req, res, next) {
    var cowid = req.body['cowbang'];
    var latitude = req.body['latitude'];
    var longitude = req.body['longitude'];
    fs.appendFile('./cowz/c1.txt',latitude + ' , '+ longitude +' , '+cowid +'\n',function(err){});
    jsonfile.readFile('./views/ahooo.json',function(err,obj){
        obj[cowid-1].Lat = latitude;
        console.log(obj[cowid-1]);
        obj[cowid-1].Lng = longitude;
        jsonfile.writeFile('./views/ahooo.json',obj,function(){});       
     });

    
    res.render('helo');
});
module.exports = router;
