var express = require("express");
var jsonfile = require("jsonfile");
var fs = require("fs");
var router = express.Router();
var request = require('request');
//↑モジュール呼び出してる

router.get("/:number", function(req, res, next) {


  var options = {
      url: 'http://localhost:4000',
      method: 'GET'
  };

  request(options, function (error, response, body) {
      res.send(body);
      console.log(body);
  });

});

module.exports = router;