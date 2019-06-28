var express = require("express");
var jsonfile = require("jsonfile");
var fs = require("fs");
var ftp = require("ftp");
var wifi = require("node-wifi");
var router = express.Router();
var c = new ftp();

//↑モジュール呼び出してる

router.get("/", function(req, res, next) {
//   wifi.init({
//     iface: null
//   });
//   wifi.disconnect(function(err) {
//     if (err) {
//       console.log(err);
//     }
    console.log("Disconnected");
   // wifi.scan(function(err, networks) {
      //wifiをスキャン
      var conectedFlag = 0; //目的のドローンにアクセスできたかの変数
    
        // wifiスキャンのエラー処理
       // console.log(err);
    
        // //   console.log(networks); // wifiの一覧をJSON形式で出力
        // for (var i = 0; i < Object.keys(networks).length; i++) {
        //   //検索
        //   //目的のwifiをサーチするfor文
        //   if (networks[i].ssid == "Bebop2-043314") {
        //     console.log("bebop2 there");
        //     res.send("1");
        //     conectedFlag = 1; //見つけたらFlagを1に
        //     break;
        //   }
        // }
        // if (conectedFlag == 0) {
        //   res.send("0");
        //   console.log("not found");
        // }
        // if (conectedFlag == 1) {
         // wifi.connect({ ssid: "Bebop2-043314", password: "" }, function(err) {
           // if (err) {
             // console.log(err);
            //} else {
              console.log("startConnect");
              c.connect({
                host: "192.168.42.1",
                port: 21,
                user: "anonymous",
                password: ""
              });
              console.log("InsetTimeout");
              c.on("ready", function() {
                console.log("ok");
                c.cwd("internal_000/Bebop_2/media", function(err, currentDir) {
                  c.list(function(err, list) {
                    if (err) throw err;
                    console.dir(list);
                    c.end();
                  });
                });
              });
           // }
          //});
        
     // }
//     });
//   });
});

module.exports = router;
