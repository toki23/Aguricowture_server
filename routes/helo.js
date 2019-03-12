var express = require('express');
var fs = require('fs');
var router = express.Router();
var cowdata = {
    '1': 'non',
    '2': 'non',
    '3': 'non',
    '4': 'non',
    '1t': 'non',
    '2t': 'non',
    '3t': 'non',
    '4t': 'non', 
}
router.get('/', function(req, res, next) {
    res.render('helo');
});
router.post('/', function(req, res, next) {
    var cowid = req.body['cowbang'];
    var latitude = req.body['latitude'];
    var longitude = req.body['longitude'];
    console.log(latitude);
    console.log(req.body['longitude']);

    fs.appendFile('./cowz/c1.txt',latitude + ' , '+ longitude +' , '+cowid +'\n',function(err){});
    
    cowdata[cowid] = latitude +' , ' + longitude;
  
    
    res.render('helo');
    module.exports.data = cowdata;

});
module.exports = router;
module.exports.data = cowdata;