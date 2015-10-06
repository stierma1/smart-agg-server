
var $ = require("jquery");
var _ = require("lodash");
var Bluebird = require("bluebird");
var uuid = require("uuid");
var AggregationRule = require("../aggregation-rule/main");

class AggregationRuleList {
  constructor(data){
    this._data = _.extend(data, {_instanceId:uuid.v4().replace(/-/, "")});
    this.element = null;
    this.initialized = this.render().then((element) => {
      this.element = element;
      return this;
    });
  }

  render(){
    var template = require("./dust/aggregation-rule-list.dust");
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
    var aggRules = this._data.rules.map((aggRule) => {
      return new AggregationRule(aggRule).initialized;
    });

    var aggProm = Bluebird.all(aggRules)
      .then((aggRules) => {
        aggRules.map((rule) => {
          var li = $("<li></li>").append(rule.element);

          element.append(li);
        });
      });

    return aggProm
      .then(() => {return element;});
  }

  _unload(){

  }

}

module.exports = AggregationRuleList;
