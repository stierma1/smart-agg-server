
var EZNotation = require("./easy-notation");
var $ = require("jquery");
require("bootstrap-webpack");
var AggregationRule = require("./components/aggregation-rule/main");
var GetModule = require("./components/get-module/main");

(new GetModule({})).initialized
  .then((gm) => {
    $("#mount").append(gm.element);
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
    data.map((rule) => {
      var agg = new AggregationRule(rule);
      agg.initialized.then((aggO) => {
        $("#mount").append(aggO.element);
      });
    });
  });

document.getElementById("RuleBtn").addEventListener("click", processRule);

function processRule(){

  var val = document.getElementById("Rule").value;
  var rule = EZNotation.parse(val);

  $.post("/rules/" + rule.id, {inputContexts:rule.inputs, resultContexts:rule.outputs})
    .success(function(){
      window.location.reload();
    });
}
