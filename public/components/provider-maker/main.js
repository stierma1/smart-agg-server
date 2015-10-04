
var $ = require("jquery");
var _ = require("lodash");
var Bluebird = require("bluebird");
var uuid = require("uuid");

class ProviderMaker {
  constructor(data){
    this._data = _.extend(data, {_instanceId:uuid.v4().replace(/-/g, "")});
    this.element = null;
    this.initialized = this.render().then((element) => {
      this.element = element;
      return this;
    });
  }

  render(){
    var template = require("./dust/provider-maker.dust");
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
    element.find("#" + this._data._instanceId + "-provider-make").click(()=> {this.makeProvider()});
    //element.find("#" + this._data._instanceId + "-module-get").click(()=> {this.getModule()});
    return element;
  }

  _inject(element){
    return element;
  }

  _unload(){

  }

  makeProvider(){
    $("#" + this._data._instanceId + "-provider-status").html("Making");
    var id = $("#" + this._data._instanceId + "-provider-id").val();
    var mod = $("#" + this._data._instanceId + "-provider-module").val();
    var persist = $("#" + this._data._instanceId + "-provider-persist").val() === "on";
    var config = $("#" + this._data._instanceId + "-provider-config").val();
    $.post("/instances/" + id, {id:id, module:mod, persist:persist, config:JSON.parse(config)}).success(() => {
      window.location.reload();
    })
    .fail((err) => {
      $("#" + this._data._instanceId + "-provider-status").html(err.responseText || err.message || err);
    })
  }

}

module.exports = ProviderMaker;
