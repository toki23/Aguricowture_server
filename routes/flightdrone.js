var express = require('express');
var router = express.Router();
var jsonfile = require('jsonfile');
var fs = require('fs');
var ftp = require('ftp');
var bebop = require('node-bebop');
var drone = bebop.createClient();
var alreadyFlying = false;
var c = new ftp();
var r = 0;
router.get('/:number', function(req, res, next) {
   jsonfile.readFile('./views/ahooo.json',function(err,obj){
   		res.send(obj[req.params.number-1]);
   		var a = "";
   		a += "QGC WPL 120\n";
   		a += "0	0	3	2500	0.000000	30.000000	2073600.000000	0.000000	0.000000	0.000000	0.000000	1\n";
   		a += "1	0	3	178	0.000000	6.000000	-1.000000	0.000000	0.000000	0.000000	0.000000	1\n";
        a += "2	0	3	16	0.000000	5.000000	0.000000	"+obj[req.params.number-1].Lat+" "+obj[req.params.number-1].Lng+" 200 3.000000	1\n";
        a += "3	0	3	50000	0.000000	-1.000000	0.000000	0.000000	0.000000	0.000000	0.000000	1\n";
        a += "4	0	3	21	0.000000	0.000000	0.000000	"+obj[req.params.number-1].Lat+" "+obj[req.params.number-1].Lng+" 200 3.000000	1\n";
        a += "5	0	3	2501	0.000000	0.000000	0.000000	0.000000	0.000000	0.000000	0.000000	1\n";
        console.log(a);
   		fs.writeFile('./routes/flightPlan.mavlink',a,function(err){console.log(err);});
   	});
//    c.connect({
// 	    host:"192.168.42.1",
//     	port:21,
//     	user:"anonymous",
//    		password:""
// 	});
//    c.on('ready',function(){
//   	  console.log("ok");
//   	   	// c.put('./routes/flightPlan.mavlink', 'internal_000/flightplans/flightPlan.mavlink', function(err){
//         c.put('./routes/flightPlan.mavlink', 'internal_000/flightplans/flightPlan.mavlink', function(err){
//    			if (err) throw err;
//    			console.log("finish");
//    			c.end();
//    		});
//         console.log("putfinish");
//      c.get('internal_000/Bebop_2/media/Bebop_2_2019-04-17T163958+0900_B1CEA0.mp4', function(err, stream) {
//       if (err) throw err;
//       stream.once('close', function() { c.end(); });
//       stream.pipe(fs.createWriteStream('Bebop_2_2019-04-17T163958+0900_B1CEA0.mp4'));
//      });
// 　　});
// 	c.on('error',function(err){
// 	    console.log(err);
// 	});
// 	c.on('greeting',function(message){
//     	console.log(message);
//     	console.log("生きているって素晴らしい");
// 	});
// 	c.list(function(err, list) {
//     	if (err) throw err;
//    		console.dir(list);
//     	c.end();
//     });
    if(r == 1){
      drone.on("GPSFixStateChanged", function(data) {
     console.log("GPSFixStateChanged", data);
   });
    }
    if(r == 0){
   	drone.connect(function() {
      console.log("aiueokaki");
  


  // drone.on("MavlinkPlayErrorStateChanged", function(data) {
  //   console.log("MavlinkPlayErrorStateChanged", data);
  // });

  // drone.on("MavlinkFilePlayingStateChanged", function(data) {
  //   console.log("MavlinkFilePlayingStateChanged", data);
  // });
  // console.log("aa");
  // drone.on("AvailabilityStateChanged", function(data) {
  //   console.log("AvailabilityStateChanged", data);
  //   if (data.AvailabilityState === 1 && !alreadyFlying) {
      r = 1;
      //alreadyFlying = true;
      //drone.Mavlink.start("/data/ftp/internal_000/flightplans/flightPlan.mavlink", 0);
      //console.log("aa");
   // }
  //});

  // drone.on("ComponentStateListChanged", function(data) {
  //   console.log("ComponentStateListChanged", data);
  // });

  // drone.on("ready", function () {
  //   console.log("ready");
  // });

  // drone.on("battery", function (data) {
  //   console.log(data);
  // });

  // drone.on("landed", function () {
  //   console.log("landed");
  // });

  // drone.on("takingOff", function () {
  //   console.log("takingOff");
  // });

  // drone.on("hovering", function () {
  //   console.log("hovering");
  // });

  // drone.on("FlyingStateChanged", function () {
  //   console.log("FlyingStateChanged");
  // });

  // drone.on("BatteryStateChanged", function () {
  //   console.log("BatteryStateChanged");
  // });

  // drone.on("flying", function() {
  //   console.log("flying");
  // });

  // drone.on("landing", function() {
  //   console.log("landing");
  // });

  // drone.on("unknown", function(data) {
  //   console.log("unknown", data);
  // });
});
}
});

module.exports = router;