var express = require('express');
var fs = require('fs');
var router = express.Router();
var jsonfile = require('jsonfile');
router.get("/",(req,res,next)=>{
    res.render("helo");
});
router.post('/', function(req, res, next) {
    var cowid = req.body['cowbang'];
    var latitude = req.body['latitude'];
    var longitude = req.body['longitude'];

    console.log(cowid,latitude,longitude)
    fs.appendFile('./cowz/c1.txt',latitude + ' , '+ longitude +' , '+cowid +'\n',function(err){});
    writeCowdata(cowid,latitude,longitude);
    //writeGraphData(cowid,latitude,longitude);

    res.render('helo');
});

module.exports = router;

function writeCowdata(cowid,latitude,longitude){
    jsonfile.readFile('./views/ahooo.json',function(err,obj){
        console.log(obj);
        obj[cowid-1].Lat = latitude;
        console.log(obj[cowid-1]);
        obj[cowid-1].Lng = longitude;
        jsonfile.writeFile('./views/ahooo.json',obj,function(){});
    });
}

// function writeGraphData(cowid,latitude,longitude){


// }

