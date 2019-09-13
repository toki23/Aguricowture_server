var express = require("express");
var jsonfile = require("jsonfile");
var fs = require("fs");
var router = express.Router();
var request = require('request');
var getjson = require("../public/javascripts/getjson");
var path   = "localhost:4000"
router.get("/changePath/:path",(req,res,next)=>{
  path = req.params.path;
  console.log(path);
  res.send("changepath");
});

router.get("/:number", async function(req, res, next) {

  var jsonObj = await getjson("./views/ahooo.json");
  var options = {
      url: `http://${path}/flightdrone/${jsonObj[req.params.number-1].Lat}/${jsonObj[req.params.number-1].Lng}`,
      method: 'GET'
  };
  console.log(`http://${path}/flightdrone/${jsonObj[req.params.number-1].Lat}/${jsonObj[req.params.number-1].Lng}`);
  request(options, function (error, response, body) {
      res.send(body);
  });

});

module.exports = router;
