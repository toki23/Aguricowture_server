var express = require('express');
var router = express.Router();
var helo = require('./helo');
router.get('/', function(req, res, next) {
   res.json({
        message
    });
});
module.exports = router;
