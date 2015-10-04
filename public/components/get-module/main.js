
var $ = require("jquery");
var _ = require("lodash");
var Bluebird = require("bluebird");
var uuid = require("uuid");

class GetModule {
  constructor(data){
    this._data = _.extend(data, {_instanceId:uuid.v4().replace(/-/g, "")});
    this.element = null;
    this.initialized = this.render().then((element) => {
      this.element = element;
      return this;
    });
  }

  render(){
    var template = require("./dust/get-module.dust");
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
    var element = $(html);
    element.find("#" + this._data._instanceId + "-module-test").click(()=> {this.testModule()});
    element.find("#" + this._data._instanceId + "-module-get").click(()=> {this.getModule()});
    return element;
  }

  _inject(element){
    return element;
  }

  _unload(){

  }

  testModule(){
    $("#" + this._data._instanceId + "-module-status").html("Testing");
    var val = $("#" + this._data._instanceId + "-module-text").val();
    $.post("/modules/" + val + "?test=true").success(() => {
      $("#" + this._data._instanceId + "-module-status").html("Pass");
    })
    .fail((err) => {
      $("#" + this._data._instanceId + "-module-status").html(err.responseText || err.message);
    })
  }

  getModule(){
    $("#" + this._data._instanceId + "-module-status").html("Getting");
    var val = $("#" + this._data._instanceId + "-module-text").val();
    $.post("/modules/" + val).success(() => {
      $("#" + this._data._instanceId + "-module-status").html("Pass");
    })
    .fail((err) => {
      $("#" + this._data._instanceId + "-module-status").html(err.responseText || err.message);
    })
  }

}

module.exports = GetModule;
