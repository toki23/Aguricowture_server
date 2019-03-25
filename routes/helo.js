var express = require('express');
var fs = require('fs');
var router = express.Router();
var cowdata = {
    'la1': 'non',
    'la2': 'non',
    'la3': 'non',
    'la4': 'non',
    'lo1': 'non',
    'lo2': 'non',
    'lo3': 'non',
    'lo4': 'non', 
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
    
    cowdata["la" + cowid  ] = latitude;
    cowdata["lo" + cowid ] = longitude;
    console.log(cowdata["lo" + cowid] );
    
    res.render('helo');
    module.exports.data = cowdata;

});
module.exports = router;
module.exports.data = cowdata;