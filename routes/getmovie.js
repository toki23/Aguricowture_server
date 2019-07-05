var express = require("express");
var jsonfile = require("jsonfile");
var fs = require("fs");
var ftp = require("ftp");
var wifi = require("node-wifi");
var router = express.Router();
var archiver = require('archiver');
var c = new ftp();
var conectedFlag;

//↑モジュール呼び出してる

router.get("/", function(req, res, next) {
  wifi.init({
    iface: null
  });
  wifi.disconnect(function(err) {
    if (err) {
      console.log(err);
    }
    wifi.scan(function(err, networks) {
      console.log(err);
      //   console.log(networks); // wifiの一覧をJSON形式で出力
      for (var i = 0; i < Object.keys(networks).length; i++) {
        //検索
        //目的のwifiをサーチするfor文
        if (networks[i].ssid == "Bebop2-043314") {
          res.send("1");
          conectedFlag = 1; //見つけたらFlagを1に
          break;
        }
      }

      if (conectedFlag == 0) {
        res.send("0");
        console.log("not found");
      }
      if (conectedFlag == 1) {
        console.log("conect");
        wifi.connect({ ssid: "Bebop2-043314", password: "" }, function(err) {
          if (err) {
            console.log(err);
          } else {
            setTimeout(function() {
              c.connect({
                host: "192.168.42.1",
                port: 21,
                user: "anonymous",
                password: ""
              });
              c.on("ready", function() {
                console.log("c.concect");
                c.cwd("internal_000/Bebop_2/media", function(err, currentDir) {
                  c.list(function(err, list) {
                    if (err) throw err;
                    c.get(getFile(0, list), function(err, stream) {
                      if (err) throw err;
                      stream.once("close", function() {
                        c.end();
                      });
                      stream.pipe(fs.createWriteStream("aa.mp4"));
                    });
                    c.end();
                    setTimeout(function(){
                    wifi.disconnect(function(err) {
                      if (err) {
                        console.log(err);
                      }
                      wifi.connect(
                        { ssid: "media", password: "metro-cit" },
                        function(err) {

                        }
                      );
                    });
                  },50000);
                  });
                });
              });
            }, 50000);
          }
        });
      }
    });
  });
});

module.exports = router;
function getFile(i, H) {
  H.sort(compare);
  return H[i].name;
}
function compare(a, b) {
  var r = 0;
  if (a.date < b.date) {
    r = 1;
  } else if (a.date > b.date) {
    r = -1;
  }
  return r;
}
