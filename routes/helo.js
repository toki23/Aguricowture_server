var express = require('express');
var fs = require('fs');
var router = express.Router();
var cowdatala = {
    '1': 'non',
    '2': 'non',
    '3': 'non',
    '4': 'non', 
}
var cowdatalo = {
    '1': 'non',
    '2': 'non',
    '3': 'non',
    '4': 'non', 
}
router.get('/', function(req, res, next) {
    res.render('helo');
});
router.post('/', function(req, res, next) {
    var cowid = req.body['cowbang'];
    var latitude = req.body['latitude'];
    var longitude = req.body['longitude'];
    fs.appendFile('./cowz/c1.txt',latitude + ' , '+ longitude +' , '+cowid +'\n',function(err){});
    
    cowdatala[cowid] = latitude;
    cowdatalo[cowid] = longitude;
    
    res.render('helo');
    module.exports.data = cowdata;

});
module.exports = router;
module.exports.datala = cowdatala;
module.exports.datalo = cowdatalo;
