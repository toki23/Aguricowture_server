var express = require('express');
var jsonfile = require('jsonfile');
var router = express.Router();
router.get('/:number', function(req, res, next){

  jsonfile.readFile('./views/ahooo.json',function(err,obj){
      obj = [];
      for (var i = 0; i < req.params.number; i++) {

        obj.push({"CowID":i + 1,"Lat":"non","Lng":"non"});
        console.log(obj);
        jsonfile.writeFile('./views/ahooo.json',obj,function(){});
      }
  });
  for(let i = 0;i<req.params.number;i++){
    jsonfile.writeFile(`./amount_of_movement_data/cow${i+1}.txt`,[]);
  }
  res.send(req.params.number);
});
module.exports = router;