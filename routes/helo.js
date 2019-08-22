const express = require('express');
const fs = require('fs');
const router = express.Router();
const jsonfile = require('jsonfile');
const cron = require('node-cron');
require("date-utils");

router.get("/",(req,res,next)=>{
    res.render("helo");
});

router.post('/', (req, res, next) =>{
    const cowid = req.body['cowbang'];
    console.log("post cowid = "+cowid);
    const latitude = req.body['latitude'];
    const longitude = req.body['longitude'];
    writeNowCowData(cowid,latitude,longitude);
    writeGraphData(cowid,latitude,longitude);
    res.render('helo');
});

async function writeNowCowData(cowid,latitude,longitude){
    obj = await jsonfile.readFile('./views/ahooo.json');
    obj[cowid-1].Lat = latitude;
    obj[cowid-1].Lng = longitude;
    await jsonfile.writeFile('./views/ahooo.json',obj);
}

async function writeGraphData(cowid,latitude,longitude){
    let file = await jsonfile.readFile("./cow_graph_data/cow"+cowid+".txt");
    file.push({"latitude" :latitude,"longitude" : longitude });
    jsonfile.writeFile("./cow_graph_data/cow"+cowid+".txt",file);
}

cron.schedule('0,30 * * * * *',async  () => {
    console.log("start: cron");
    for(let i = 0;i<5;i++){
            let sum = 0;
            const latAndlongfile = await jsonfile.readFile(`./cow_graph_data/cow${i+1}.txt`);
            if(latAndlongfile.length <2)continue;
            for(let j = 1;j<latAndlongfile.length;j++){
                console.log("cowid = " +(i+1)+" loop = "+j + " length = "+ latAndlongfile.length);
                    sum +=  getdist(latAndlongfile[j-1].latitude,latAndlongfile[j].longitude,latAndlongfile[j-1].latitude,latAndlongfile[j].longitude);
            }
            const amountDataFile = await jsonfile.readFile(`./amount_of_movement_data/cow${i+1}.txt`);
            const  dt = new Date();
            const formatted = dt.toFormat("DDHH");
            amountDataFile.push({"moving": sum,"time" :formatted});
            await jsonfile.writeFile(`./amount_of_movement_data/cow${i+1}.txt`,amountDataFile);
            await jsonfile.writeFile(`./cow_graph_data/cow${i+1}.txt`,[]);
    }
});

function getdist(x1,y1,x2,y2) {

        let a, b, d;
        a = x1 - x2;
        b = y1 - y2;
        d = Math.sqrt(Math.pow(a,2) + Math.pow(b,2));
    return d;

};

module.exports = router;
