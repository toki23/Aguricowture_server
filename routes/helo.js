var express = require('express');
var date_utils = require('date-utils');

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
    var dt = new Date();
    var cowid = req.body['cowbang'];
    var latitude = req.body['latitude'];
    var longitude = req.body['longitude'];
    var formatted = dt.toFormat("YYYY MM DD HH24 MI SS");
    
    fs.appendFile('./cowz/c1.txt',latitude + ' , '+ longitude +' , '+cowid,function(err){});
    
    cowdata[cowid] = gpsdata;
    cowdata[cowid + 't'] = formatted;
    
    res.render('helo');
    module.exports.data = cowdata;

});
module.exports = router;
module.exports.data = cowdata;