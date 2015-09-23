
class Parser{
  constructor(str){
    this.id = null;
    this.inputs = [];
    this.outputs = [];

    this.parse(str)
  }

  parse(str){
    var segments = str.split("->");
    for(var segment of segments){
      var classified = this.classify(segment.trim());
      if(classified === "rule"){
        if(this.inputs.length === 0){
          throw new Error("No input ContextRules detected");
        }
        this.id = segment.trim();
      } else {
        var ctxRule = this.toCtxRule(segment.trim());
        if(classified === "input"){
          this.inputs.push(ctxRule);
        } else {
          this.outputs.push(ctxRule);
        }
      }
    }
  }

  classify(segment){
    if(this.id){
      return "output";
    } else if(segment[0] === "{"){
      return "input";
    } else {
      return "rule";
    }
  }

  toCtxRule(segment){

    var provSplitIdx = segment.indexOf("}");
    var provider = segment.substr(1, provSplitIdx - 1);
    var pred = segment.substr(provSplitIdx + 1).trim();
    var predicateIdx = pred.indexOf(")");
    var predicate = pred.substr(0, predicateIdx + 1);
    var groundings = pred.substr(predicateIdx + 1).split(",").map(function(val){return val.trim()});

    return {
      provider: provider,
      groundings: groundings,
      predicate:{raw:predicate}
    }
  }
}

module.exports = {
  parse: function(str){
    return new Parser(str);
  }
}
