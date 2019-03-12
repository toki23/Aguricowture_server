var express = require('express');
var date_utils = require('date-utils');

var fs = require('fs');
var router = express.Router();
var usidata = {
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
    var usibg = req.body['usibang'];
    var gpsdata = req.body['gps'];
    var formatted = dt.toFormat("YYYY MM DD HH24 MI SS");
     switch(usibg){
      case '1':
      fs.appendFile('./usiz/c1.txt',gpsdata +'\t'+ formatted + '\n',function(err){});
      break;
       case '2':
      fs.appendFile('./usiz/c2.txt',gpsdata +'\t'+ formatted + '\n',function(err){});
      break;
       case '3':
      fs.appendFile('./usiz/c3.txt',gpsdata +'\t'+ formatted + '\n',function(err){});
      break;
       case '4':
      fs.appendFile('./usiz/c4.txt',gpsdata +'\t'+ formatted, +'\n',function(err){});
      break;
      default:
      console.log('miss');
    }
    
    usidata[usibg] = gpsdata;
    usidata[usibg + 't'] = formatted;
    
    res.render('helo');
    module.exports.data = usidata;

});
module.exports = router;
module.exports.data = usidata;