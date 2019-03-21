const RequestHelper = require('../helpers/request_helper.js');

const Tile = function(url){
  this.url = url;
  this.data = [];
};

Tile.prototype.getData = function () {
  const request = new RequestHelper(this.url);
  return request.get()
  .then (data => this.handleData(data));
};

Tile.prototype.handleData = function(data){
  this.data = data
};

module.exports = Tile;
