//Should be renamed to provider-maker

var Modules = require("./modules");
var _ = require("lodash");
var fs = require("fs");
var path = require("path");

function InstanceMaker(app){
  this.app = app;
}

InstanceMaker.prototype.make = function(data){
  var moduleName = data.module;
  var id = data.id;
  var persist = data.persist;
  var config = _.extend({id:id}, data.config);

  if(Modules.check(moduleName)){
    if(persist){
      fs.writeFileSync(path.join(__dirname, "../instances/" + id + ".json"), JSON.stringify(data, null, 2));
    }
    var instance = require(moduleName)(config);
    instance.addTo(this.app);
    return instance;
  } else {
    return null;
  }
}

module.exports = InstanceMaker;
