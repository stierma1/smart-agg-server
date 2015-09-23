
function Pulse(time, app){
  if(typeof(time) === "string"){
    time = parseInt(time);
  }
  this.time = time;
  this.app = app;
  
  this.client = app.createClient("pulse_" + time);
  this._initializeInterval();
}

Pulse.prototype._initializeInterval = function(){
  var self = this;
  var count = 0;
  this.client.updatePredicate("pulse(State)", ["high"], count);
  this.client.updatePredicate("pulse(State)", ["low"], count++);
  this.interval = setInterval(function(){
    self.client.updatePredicate("pulse(State)", ["high"], count);
    self.client.updatePredicate("pulse(State)", ["low"], count++);
  }, this.time);
}

module.exports = Pulse;
