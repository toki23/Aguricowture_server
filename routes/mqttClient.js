var mqtt = require("mqtt");
var fs = require("fs");
var jsonfile = require("jsonfile");

var client = mqtt.connect("mqtt://mqtt.senseway.net", {
  password: "skyprog23",
  username: "toki23",
  port: 1883,
  topic: "lora/toki23/+/rx"
});

function start() {
  client.on("connect", function() {
    console.log("mqtt is connected");
  });

  client.subscribe("lora/toki23/+/rx", function(err, granted) {
    console.log("subscriber.subscribed.");
  });
  // parseInt("f", 16)    //  15
  // parseInt("F", 16)    //  15
  // parseInt("0xF", 16)  //  15
  // parseInt("-0Xf", 16)
  client.on("message", function(topic, message) {
    console.log(JSON.parse(message.toString()).mod.data);
    const gpsdata16 = JSON.parse(message.toString()).mod.data;
    //       let file = jsonfile.readFile("./views/ahooo.json");
    // var words = gpsdata16.split(gpsdata16[7]);
    // console.log(words[0]);
    let sum = "",sum2 = "";
    for(let i = 0;i<7;i++){
        sum += gpsdata16[i];
    }
  //  console.log(sum);
    for(let i = 7;i<14;i++){
        sum2 += gpsdata16[i];
    }
   // console.log(sum2);
    lat16 = sum;
    
    // console.log(gpsdata16[7] + words[1]);
     long16 = sum2;
    lat = parseInt(lat16, 16) * 0.000001;
    long = parseInt(long16, 16) * 0.000001;
    console.log(lat);
    console.log(long);

    jsonfile.readFile("./views/ahooo.json", (err, data) => {
      console.log(data);
      data[0].Lat = lat;
      data[0].Lng = long;
      jsonfile.writeFile("./views/ahooo.json", data);
    });
     writeGraphData(1, lat, long);
    jsonfile.readFile("./sum.json",function(err,data){
        console.log(data);
        data.push({"lat":lat,"long":long});
        jsonfile.writeFile("./sum.json",data);
    });
   });
}
async function writeNowCowData(cowid, latitude, longitude) {
  obj = await jsonfile.readFile("./views/ahooo.json");
  obj[cowid - 1].Lat = latitude;
  obj[cowid - 1].Lng = longitude;
  await jsonfile.writeFile("./views/ahooo.json", obj);
}

async function writeGraphData(cowid, latitude, longitude) {
  let file = await jsonfile.readFile("./cow_graph_data/cow" + cowid + ".txt");
  file.push({ latitude: latitude, longitude: longitude });
  jsonfile.writeFile("./cow_graph_data/cow" + cowid + ".txt", file);
}

module.exports = start;
