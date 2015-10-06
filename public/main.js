
var EZNotation = require("./easy-notation");
var $ = require("jquery");
require("bootstrap-webpack");
var AggregationRuleList = require("./components/aggregation-rule-list/main");
var GetModule = require("./components/get-module/main");
var ProviderMaker = require("./components/provider-maker/main");
var TabList = require("./components/tab-list/main");

var tL = new TabList({});

tL.initialized
  .then((tL) => {
    $("#mount").append(tL.element);
    tL.addTab("Add Rule", "add-rule", $('<label for="Rule" >Rule</label> <textarea id="Rule"></textarea> <input type="button" value="+" id="RuleBtn" />'))
    document.getElementById("RuleBtn").addEventListener("click", processRule);
  });

(new ProviderMaker({})).initialized
  .then((pm) => {
    tL.addTab("Provider Maker", "provider-maker", pm.element);
  });

(new GetModule({})).initialized
  .then((gm) => {
    tL.addTab("Get Module", "get-module", gm.element);
  });

require("./views/providers.dust");

$.get("/providers")
  .success((data) => {
    dust.render("views/providers", data, function(err, html){
      if(err){
        console.log(err);
      }
      $("#float-right").append(html);
    })
  });

$.get("/rules")
  .success((data) => {
    var aggL = new AggregationRuleList({rules:data || []});
    aggL.initialized
      .then(() => {
        tL.addTab("Rules", "rules", aggL.element)
      });
  });


function processRule(){

  var val = document.getElementById("Rule").value;
  var rule = EZNotation.parse(val);

  $.post("/rules/" + rule.id, {inputContexts:rule.inputs, resultContexts:rule.outputs})
    .success(function(){
      window.location.reload();
    });
}
