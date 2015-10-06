
var $ = require("jquery");
var _ = require("lodash");
var Bluebird = require("bluebird");
var uuid = require("uuid");

class TabList {
  constructor(data){
    this._data = _.extend(data, {_instanceId:uuid.v4().replace(/-/g, "")});
    this.element = null;
    this.hasTabs = false;
    this.initialized = this.render().then((element) => {
      this.element = element;
      return this;
    });
  }

  render(){
    var template = require("./dust/tab-list.dust");
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
    return element;
  }

  _inject(element){
    return element;
  }

  _unload(){

  }

  addTab(name, urlName, content){
    var li = $("<li><a data-toggle='tab' href='#" + urlName + "'>" + name + "</a></li>");
    var tabPane = $("<div id='" + urlName + "' class='tab-pane'></div>");

    if(!this.hasTabs){
      li.attr("class", "active");
      tabPane = $("<div id='" + urlName + "' class='tab-pane active'></div>");
      this.hasTabs = true;
    }
    tabPane.append(content);
    $("#" + this._data._instanceId + "-tab-content").append(tabPane);
    $("#" + this._data._instanceId + "-tab-list").append(li);
  }

}

module.exports = TabList;
