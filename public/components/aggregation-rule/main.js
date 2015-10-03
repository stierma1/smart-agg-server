
var $ = require("jquery");
var _ = require("lodash");
var Bluebird = require("bluebird");
var uuid = require("uuid");
var ContextRule = require("../context-rule/main");

class AggregationRule {
  constructor(data){
    this._data = _.extend(data, {_instanceId:uuid.v4().replace(/-/, "")});
    this.element = null;
    this.initialized = this.render().then((element) => {
      this.element = element;
      return this;
    });
  }

  render(){
    var template = require("./dust/aggregation-rule.dust");
    var defer = Bluebird.defer();

    dust.render(template, this._data, (err, html) => {
      if(err){
        defer.reject(err);
        return;
      }
      defer.resolve(this._bind(html));
    });

    return defer.promise
      .then((element) => {
        return this._inject(element);
      });
  }

  update(){

  }

  hide(){

  }

  _bind(html){
    return $(html);
  }

  _inject(element){
    var inputCtxRules = this._data.inputContexts.map((inputCtx) => {
      return new ContextRule(inputCtx).initialized;
    });
    var resultCtxRules = this._data.resultContexts.map((resultCtx) => {
      return new ContextRule(resultCtx).initialized;
    });

    var iCtxPromise = Bluebird.all(inputCtxRules)
      .then((iCtxRules) => {
        iCtxRules.map((rule) => {
          var li = $("<li></li>").append(rule.element);
          element.find("#" + this._data._instanceId + "-input-context-rules").append(li);
        });
      });

    var rCtxPromise = Bluebird.all(resultCtxRules)
      .then((rCtxRules) => {
        rCtxRules.map((rule) => {
          var li = $("<li></li>").append(rule.element);
          element.find("#" + this._data._instanceId + "-result-context-rules").append(li);
        });
      });

    return Bluebird.all([iCtxPromise, rCtxPromise])
      .then(() => {return element;});
  }

  _unload(){

  }

}

module.exports = AggregationRule;
