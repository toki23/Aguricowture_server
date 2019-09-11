const express = require('express');
const router = express.Router();
const jsonfile = require('jsonfile');
const cron = require('node-cron');
const geolib = require('geolib');
const NumberOfCows = require('../routes/init').NumberOfCows;
require("date-utils");
router.get("/",(req,res,next)=>{
    res.render("helo");
});

router.post('/', (req, res, next) =>{
    const cowid = req.body['cowbang'];
    // console.log("post cowid = "+cowid);
    const latitude = req.body['latitude'] ,longitude = req.body['longitude'];
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
    let file = await jsonfile.readFile('./data_folder/cow_graph_data/cow'+cowid+'.txt');
    file.push({'latitude' :latitude,'longitude' : longitude });
    jsonfile.writeFile("./data_folder/cow_graph_data/cow"+cowid+".txt",file);
}
// /'* * * * *'
cron.schedule('0 0 0,6,12,18 * * *',async  () => {
    console.log("start: cron");
    for(let i = 0;i<5;i++){
            const  dt = new Date();
            const latAndlongfile = await jsonfile.readFile(`./data_folder/cow_graph_data/cow${i+1}.txt`);
            if(latAndlongfile.length >=2){
                console.log(1);
                const amountData = await calculationOfTravel(latAndlongfile);
                await jsonfile.writeFile(`./data_folder/cow_graph_data/cow${i+1}.txt`,[latAndlongfile[latAndlongfile.length-1]]);
                const Estrus=await inEstrus(amountData,i+1);
                const currentCowCondition = await jsonfile.readFile(`./views/ahooo.json`);
                currentCowCondition[i].Estrus = Estrus;
                jsonfile.writeFile(`./views/ahooo.json`,currentCowCondition);
                const formatted = dt.toFormat("DD日HH時") ,detailedTime = dt.toFormat("YYMMDDHHMI");
                estrusDataAccumulation(i+1,amountData);
                const amountDataFile = await jsonfile.readFile(`./data_folder/amount_of_movement_data/cow${i+1}.txt`);
                amountDataFile.push({"moving": amountData.toString(),"time" :formatted,"detailedTime":detailedTime,"Estrus" : Estrus});
                await jsonfile.writeFile(`./data_folder/amount_of_movement_data/cow${i+1}.txt`,amountDataFile);
            }
    }
});

module.exports = router;

async function inEstrus(amountData,cowid){
    const averageValue = await jsonfile.readFile(`./data_folder/average_travel/cow${cowid}.txt`);
    console.log("cowid"+cowid+"   inEstrus : " + amountData+"     " +averageValue.avaregeTravel);
    if(averageValue.ready && averageValue.avaregeTravel*1.5<amountData){
        console.log("isEstrus?  :" +2 );
        return "1";
    }else if(averageValue.ready){
    console.log("isEstrus?  :" +1 );
        return "2";
    }
    console.log("isEstrus?  :" +3 );
    return "0";
}



async function estrusDataAccumulation(cowid,amountOfMovement){
    const averageValue = await jsonfile.readFile(`./data_folder/average_travel/cow${cowid}.txt`);
    console.log(averageValue);
    if(!averageValue.ready){
        if(averageValue.counter === 0){
            jsonfile.writeFile(`./data_folder/average_travel/cow${cowid}.txt`,{"avaregeTravel":(averageValue.data/10),ready:true});
        }else{
            averageValue.data += amountOfMovement;
            averageValue.counter--;
            // console.log("avaragevalue :" + averageValue.data + " " + averageValue.counter);
            jsonfile.writeFile(`./data_folder/average_travel/cow${cowid}.txt`,averageValue);
        }
    }
}

function calculationOfTravel(latitudeLongitudeFile){
    return new Promise((resolve,reject) =>{
        let sum = 0;
        for(let j = 1;j<latitudeLongitudeFile.length;j++){
            var distance = geolib.getDistance(
                {latitude: latitudeLongitudeFile[j-1].latitude, longitude : latitudeLongitudeFile[j-1].longitude},
                {latitude: latitudeLongitudeFile[j].latitude, longitude: latitudeLongitudeFile[j].longitude}
            );
            sum += distance;
        }
        resolve(sum);
    });
}

