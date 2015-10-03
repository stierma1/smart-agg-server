
var $ = require("jquery");
var _ = require("lodash");
var Bluebird = require("bluebird");
var uuid = require("uuid");

class ContextRule {
  constructor(data){
    this._data = _.extend(data, {_instanceId:uuid.v4().replace(/-/g, "")});
    this.element = null;
    this.initialized = this.render().then((element) => {
      this.element = element;
      return this;
    });
  }

  render(){
    var template = require("./dust/context-rule.dust");
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
    return element;
  }

  _unload(){

  }

}

module.exports = ContextRule;
