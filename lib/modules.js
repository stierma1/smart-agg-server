var fs = require("fs");
var smartReg = /^smart-agg-/;
var path = require("path");

var readPackage = function(){
  return JSON.parse(fs.readFileSync(path.join(__dirname , "../package.json"), "utf8"));
}

module.exports = {
  check: function(moduleName){
    var pack = readPackage();
    return pack.dependencies[moduleName] ? true : false;
  },
  list: function(){
    var pack = readPackage();
    var red = [];
    for(var idx in pack.dependencies){
      if(smartReg.test(idx)){
        red.push(idx);
      }
    }

    return red;

  }
}
