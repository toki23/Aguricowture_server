var express = require('express');
var router = express.Router();
var archiver = require('archiver');
var fs = require('fs');

router.get('/', (req, res, next) => {
  var archive = archiver.create('zip', {});
  var output = fs.createWriteStream("./usifile.zip");
  archive.pipe(output);
  archive.directory('./usiz/', 'usifile');

  archive.finalize();

  output.on("close", () => {
      console.log('Archiving done. (archive size: ' + archive.pointer() + ' total bytes)');

      res.download("./usifile.zip", 'usifile.zip', (err) => {
       if(err){
          console.log(err.stack);
        }else{
          console.log('Downloading done.');
        }
      });
  });
});

module.exports = router;
