var express = require('express');
var router = express.Router();
var helo = require('./helo');
router.get('/', function(req, res, next) {
  res.render("get", {
    bango1: helo.data['1'],
    bango2: helo.data['2'],
    bango3: helo.data['3'],
    bango4: helo.data['4'],
    bango1t: helo.data['1t'],
    bango2t: helo.data['2t'],
    bango3t: helo.data['3t'],
    bango4t: helo.data['4t'],
  });
});

module.exports = router;
