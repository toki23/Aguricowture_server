var express = require("express");
var router = express.Router();
var http = require("http");
var fs = require("fs");
router.get("/", function(req, res, next) {
  http.get("http://localhost:4000/takeMovie", resa => {
    console.log("start : http.get");
  var outfile = fs.createWriteStream("movie.zip");
    resa.pipe(outfile);

    resa.on("end", () => {
        console.log("start: res.on");
      outfile.close();
      res.download("./movie.zip", 'movie.zip', (err) => {
        console.log("start: res.downl");
        if(err){
            console.log(err.stack);
        }else{
            console.log('Downloading done.');
        }
    });
    });
  });
});

module.exports = router;
