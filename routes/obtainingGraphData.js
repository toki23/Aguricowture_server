var express = require("express");
var router  = express.Router();
const jsonfile = require("jsonfile");
router.get("/:number",async (req,res,next)=>{
    const file =   await jsonfile.readFile(`./amount_of_movement_data/cow${req.params.number}.txt`);
    res.send(file);
});
module.exports = router;