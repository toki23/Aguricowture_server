var express = require("express");
var router  = express.Router();
const jsonfile = require("jsonfile");
router.get("/:number",async (req,res,next)=>{
    const file =   await jsonfile.readFile(`./amount_of_movement_data/cow${req.params.number}.txt`);
    let senddata = [];
    for(let i = file.length-1;i>file.length-8;i--){
        if(i == -1)break;
        senddata.push(file[i]);
    }
    res.send(senddata);


    });
module.exports = router;