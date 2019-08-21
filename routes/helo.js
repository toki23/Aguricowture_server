const express = require('express');
const fs = require('fs');
const router = express.Router();
const jsonfile = require('jsonfile');
const cron = require('node-cron');
var CowStartFlag = new Array(100);

router.get("/",(req,res,next)=>{
    res.render("helo");
});


router.post('/', (req, res, next) =>{
    let cowid = req.body['cowbang'];
    let latitude = req.body['latitude'];
    let longitude = req.body['longitude'];
    writeCowdata(cowid,latitude,longitude);
    writeGraphData(cowid,latitude,longitude);
    res.render('helo');
});

module.exports = router;

function writeCowdata(cowid,latitude,longitude){
    jsonfile.readFile('./views/ahooo.json',function(err,obj){
        console.log(obj);
        obj[cowid-1].Lat = latitude;
        console.log(obj[cowid-1]);
        obj[cowid-1].Lng = longitude;
        jsonfile.writeFile('./views/ahooo.json',obj,function(){});
    });
}

async function writeGraphData(cowid,latitude,longitude){
    CowStartFlag[cowid-1] = 1;
    console.log("writeGraphData");
    var file = await jsonfile.readFile("./cow_graph_data/cow"+cowid+".txt");
    file.push({"latitude" :latitude,"longitude" : longitude });
    jsonfile.writeFile("./cow_graph_data/cow"+cowid+".txt",file);
}
// cron.schedule('0 0 0,6,12,18 * * *',async () => {
//     for(let i = 0;i<0;i++){
//         if(CowStartFlag == 1){
//             let sum = 0;
            
//             let file = await jsonfile.readFile(`./cow_graph_data/cow${i+1}`);
//             for(let j = 1;j<file.length();j++){
//                 sum += getdist(file[j-1].latitude,file[i].longitude,file[j-1].latitude,file[j].longitude);
//             }
//             jsonfile.writeFile(`./cow_graph_data/cow${i+1}.txt`,"[]");
//             jsonfile.readFile()
//         }
//     }
    
// });
function getdist(x1,y1,x2,y2) {
　　var a, b, d;
　　a = x1 - x2;
　　b = y1 - y2;
　　d = Math.sqrt(Math.pow(a,2) + Math.pow(b,2));

    return d;
};
