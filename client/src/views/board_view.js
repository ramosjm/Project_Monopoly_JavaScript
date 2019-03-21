const PubSub = require('../helpers/pub_sub.js');
const TileView = require('./tile_view');

const BoardView = function(container){
  this.container = container;

};

BoardView.prototype.bindEvents = function() {
  PubSub.subscribe('Tile:all-tiles-ready',(evt)=>{
    const tiles = evt.detail;
    tiles.forEach((tile)=>{
      tileView = new TileView(tile);
      this.container.appendChild(tileView.render());
    });

  });

};

module.exports = BoardView;
