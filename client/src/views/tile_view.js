const PubSub = require('../helpers/pub_sub.js');

const TileView = function(tile){
 this.id = tile.tile_id;

};

TileView.prototype.render = function(){
  const paragraph = document.createElement('p');
  paragraph.textContent = this.id;
  return paragraph;
};

module.exports = TileView;
