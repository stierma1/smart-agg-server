
var spawn = require("child_process").spawnSync;


module.exports = {
  test: function(moduleText){
    var ret = spawn("npm", ["view", moduleText]);

    return ret;
  },
  get: function(moduleText){
    var ret = spawn("npm", ["install", "--save", moduleText]);

    return ret;
  }
}
