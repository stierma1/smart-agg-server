
var express = require("express");
var glob = require("glob");
var bodyParser = require("body-parser");
var Application = require("smart-agg");
var _ = require("lodash");
var config = require("./config");
var ModFetch = require("./lib/module-fetch");
var Modules = require("./lib/modules");
var InstanceMaker = require("./lib/instance-maker");

var app = express();

var routesFiles = glob.sync(__dirname + "/routes/*.js");
var myApp = new Application({
  debug:true,
  adapters:config.adapters || [],
  interfaces:config.interfaces || {}
});

var instanceMaker = new InstanceMaker(myApp);

app.use(bodyParser())

app.get("/modules", function(req, res){
  res.status(200).json(Modules.list());
});

app.get("/rules", function(req, res){
  var serialRules = JSON.parse(myApp.serializeRules());
  var rules = _.map(serialRules, function(val, idx){
    val.id = idx;
    return val;
  });

  res.status(200).json(rules);
});

app.get("/providers", function(req, res){
  var currData = JSON.parse(myApp.serializeCurrentData());
  var providers = [];
  _.map(currData, function(val, providerKey){
    providers.push(providerKey);
  });
  res.status(200).json({providers:providers});
});

app.post("/rules/:id", function(req, res){
  var rules = JSON.parse(myApp.serializeRules());
  rules[req.params.id] = req.body;
  myApp.loadRules(JSON.stringify(rules));
  res.status(200).end();
});

app.post("/modules/:moduleText", function(req, res){
  if(req.query.test){
    var val = ModFetch.test(req.params.moduleText);
    if(val.status === 0){
      res.status(200).send(val.stdout);
    } else {
      res.status(400).send(val.stderr);
    }
  } else {
    var val = ModFetch.get(req.params.moduleText);
    if(val.status === 0){
      res.status(200).send(val.stdout);
    } else {
      res.status(400).send(val.stderr);
    }
  }
});

app.post("/instances/:id", function(req, res){
  var result = instanceMaker.make(req.body);
  if(result){
    res.status(200).end();
  } else {
    res.status(400).send("Module Name not found");
  }
});

app.use("/index.html",express.static(__dirname + "/public/index.html"));
app.use(express.static(__dirname + "/build"));

glob.sync("./instances/*.json")
  .map(function(file){
    instanceMaker.make(require(file));
  });

app.listen(config.port || 3001);

var serialProvider = myApp.createClient("serializer");

setInterval(function(){
  serialProvider.updatePredicate("serialized(TimeStamp)", [Date.now()], {$time:Date.now(), rules:myApp.serializeRules()})
}, 15000);

var logger = myApp.createClient("logger");
logger.on("invoke-rule", function(rule){
  console.log(rule);
});
