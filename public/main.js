
var EZNotation = require("./easy-notation");
var $ = require("jquery");

require("./views/rules.dust");
require("./views/rule.dust");
require("./views/context-rule.dust");
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
    dust.render("views/rules", {rules:data}, function(err, html){
      if(err){
        console.log(err);
      }

      $("#mount").append(html);
    })
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
