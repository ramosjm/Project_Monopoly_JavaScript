const PubSub = require('../helpers/pub_sub.js');
const TileView = require('./tile_view');

const BoardView = function(){

};

BoardView.prototype.bindEvents = function() {
  PubSub.subscribe('Tile:all-tiles-ready',(evt)=>{
    const tiles = evt.detail;
    tiles.forEach((tile)=>{
      console.log(tile);
      tileView = new TileView(tile);
      tileView.render();
    });

  });

};

module.exports = BoardView;
