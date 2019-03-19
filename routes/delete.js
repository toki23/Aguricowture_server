var express = require('express');
var fs = require('fs');
var router = express.Router();

router.get('/',function(req,res,next){
	 fs.writeFile('./cowz/c1.txt',"",function(err){});
	 res.send("deleted");
});
module.exports = router;