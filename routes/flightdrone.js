var express = require("express");
var jsonfile = require("jsonfile");
var fs = require("fs");
var router = express.Router();
var request = require('request');
var getjson = require("../public/javascripts/getjson");


router.get("/:number", async function(req, res, next) {

  var jsonObj = await getjson("./views/ahooo.json");
  var options = {
      url: `http://localhost:4000/flightdrone/${jsonObj[req.params.number].lat}/${jsonObj[req.params.number].long}`,
      method: 'GET'
  };
  console.log(`http://localhost:4000/flightdrone/${jsonObj[req.params.number-1].Lat}/${jsonObj[req.params.number-1].Lng}`);
  request(options, function (error, response, body) {
      res.send(body);
  });

});

module.exports = router;
