const PubSub = require('../helpers/pub_sub.js');

const TileView = function(tile){
 this.id = tile.tile_id;
 this.name = tile.name;

};

TileView.prototype.render = function(index){
  const paragraph = document.createElement('div');
  paragraph.classList.add(`item-${index}`);
  paragraph.textContent = this.name;
  return paragraph;
};

module.exports = TileView;
