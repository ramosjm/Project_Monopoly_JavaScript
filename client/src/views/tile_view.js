const PubSub = require('../helpers/pub_sub.js');

const TileView = function(tile){
 this.id = tile.tile_id;

};

TileView.prototype.render = function(index){
  const paragraph = document.createElement('div');
  paragraph.classList.add(`item-${index}`);
  paragraph.textContent = this.id;
  return paragraph;
};

module.exports = TileView;
