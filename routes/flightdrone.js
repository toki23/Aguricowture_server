var express = require("express");
var jsonfile = require("jsonfile");
var fs = require("fs");
var ftp = require("ftp");
var wifi = require("node-wifi");
var bebop = require("node-bebop");
var router = express.Router();
var drone = bebop.createClient();
var alreadyFlying = false;
var c = new ftp();

//↑モジュール呼び出してる

router.get("/:number", function(req, res, next) {
  if(req.params.number == "1"){
  res.send("1");
  }else{
  res.send("0");
  }
  // wifi.init({
  //   iface: null
  // });
  // wifi.disconnect(function(err) {
  //   if (err) {
  //     console.log(err);
  //   }
  //   console.log("Disconnected");
  //   wifi.scan(function(err, networks) {
  //     //wifiをスキャン
  //     var conectedFlag = 0; //目的のドローンにアクセスできたかの変数
  //     if (err) {
  //       // wifiスキャンのエラー処理
  //       console.log(err);
  //     } else {
  //       //   console.log(networks); // wifiの一覧をJSON形式で出力
  //       for (var i = 0; i < Object.keys(networks).length; i++) {
  //         //検索
  //         //目的のwifiをサーチするfor文
  //         if (networks[i].ssid == "Bebop2-043314") {
  //           console.log("bebop2 there");
  //           res.send("1");
  //           conectedFlag = 1; //見つけたらFlagを1に
  //           break;
  //         }
  //       }
  //       if (conectedFlag == 0) {
  //         res.send("0");
  //         console.log("not found");
  //       }
  //       if (conectedFlag == 1) {
  //         // jsonfile.readFile("./views/ahooo.json", function(err, obj) {
  //         //   var a = "";
  //         //   a += "QGC WPL 120\n";
  //         //   a +=
  //         //     "0	0	3	2500	0.000000	30.000000	2073600.000000	0.000000	0.000000	0.000000	0.000000	1\n";
  //         //   a +=
  //         //     "1	0	3	178	0.000000	6.000000	-1.000000	0.000000	0.000000	0.000000	0.000000	1\n";
  //         //   a +=
  //         //     "2	0	3	16	0.000000	5.000000	0.000000	" +
  //         //     obj[req.params.number - 1].Lat +
  //         //     " " +
  //         //     obj[req.params.number - 1].Lng +
  //         //     " 200 3.000000	1\n";
  //         //   a +=
  //         //     "3	0	3	50000	0.000000	-1.000000	0.000000	0.000000	0.000000	0.000000	0.000000	1\n";
  //         //   a +=
  //         //     "4	0	3	21	0.000000	0.000000	0.000000	" +
  //         //     obj[req.params.number - 1].Lat +
  //         //     " " +
  //         //     obj[req.params.number - 1].Lng +
  //         //     " 200 3.000000	1\n";
  //         //   a +=
  //         //     "5	0	3	2501	0.000000	0.000000	0.000000	0.000000	0.000000	0.000000	0.000000	1\n";
  //         //   fs.writeFile("./routes/flightPlan.mavlink", a, function(err) {
  //         //     console.log(err);
  //         //   });
  //         // });
  //         wifi.connect({ ssid: "Bebop2-043314", password: "" }, function(err) {
  //           if (err) {
  //             console.log(err);
  //           } else {
  //             console.log("startConnect");
  //             setTimeout(function() {
  //               c.connect({
  //                 host: "192.168.42.1",
  //                 port: 21,
  //                 user: "anonymous",
  //                 password: ""
  //               });
  //               console.log("InsetTimeout");
  //               c.on("ready", function() {
  //                 console.log("ok");
  //                 c.put(
  //                   "./routes/flightPlan.mavlink",
  //                   "internal_000/flightplans/flightPlan.mavlink",
  //                   function(err) {
  //                     if (err) throw err;
  //                     console.log("putfinish");
  //                     c.end();
  //                   }
  //                 );
  //                 setTimeout(function() {
  //                   drone.connect(function() {
  //                     console.log("flightready");
  //                     drone.Mavlink.start(
  //                       "/data/ftp/internal_000/flightplans/flightPlan.mavlink",
  //                       0
  //                     );
  //                   });
  //                   setTimeout(function() {
  //                     wifi.disconnect(function(err) {
  //                       if (err) {
  //                         console.log(err);
  //                       }
  //                       console.log("Disconnected");
  //                     });
  //                     setTimeout(function() {
  //                       wifi.connect(
  //                         { ssid: "media", password: "metro-cit" },
  //                         function(err) {
  //                           if (err) {
  //                             console.log(err);
  //                           }
  //                           console.log("connected");
  //                         }
  //                       );
  //                     }, 1000);
  //                   }, 10000);
  //                 }, 10000);
  //               });
  //             }, 10000);
  //           }
  //         });
  //         console.log("foo");
  //       }
  //     }
  //   });
  // });
});

module.exports = router;
