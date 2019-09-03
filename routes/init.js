var express = require('express');
var jsonfile = require('jsonfile');
var router = express.Router();
router.get('/:number', function(req, res, next){

  jsonfile.readFile('./views/ahooo.json',function(err,obj){
      obj = [];
      for (var i = 0; i < req.params.number; i++) {

        obj.push({"CowID":i + 1,"Lat":1,"Lng":1});
        console.log(obj);
        jsonfile.writeFile('./views/ahooo.json',obj,function(){});
      }
  });
  for(let i = 0;i<req.params.number;i++){
    jsonfile.writeFile(`./data_folder/amount_of_movement_data/cow${i+1}.txt`,[]);
    jsonfile.writeFile(`./data_folder/cow_graph_data/cow${i+1}.txt`,[]);
    jsonfile.writeFile(`./data_folder/average_travel/cow${i+1}.txt`,{"data":0,"counter":28,"ready":false});
    // jsonfile.writeFile(`./`)
  }

  res.send(req.params.number);
  module.exports.numberOfCows = req.params.number;
});

module.exports.numberOfCows = 5;
module.exports = router;
