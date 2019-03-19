var express = require('express');
var router = express.Router();
router.get('/1', function(req, res, next) {
 res.send("1");
});
router.get('/2', function(req, res, next) {
 res.send("2");
});
router.get('/3', function(req, res, next) {
 res.send("3");
});
router.get('/4', function(req, res, next) {
 res.send("4");
});
module.exports = router;