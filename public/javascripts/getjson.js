var jsonfile = require('jsonfile');
function getJson(filepath){
    return new Promise( (resolve,reject)=>{
        jsonfile.readFile(filepath,function(err,obj){
           resolve(obj);
        });
    });
}
module.exports = getJson;