//consider moving this to the board class.

const PubSub = require('../helpers/pub_sub.js');
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
  PubSub.publish('Tile:all-tiles-ready',this.data);
};

module.exports = Tile;
