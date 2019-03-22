const PubSub = require('../helpers/pub_sub.js');
const TileView = require('./tile_view');

const BoardView = function(container){
  this.container = container;

};

BoardView.prototype.bindEvents = function() {
  PubSub.subscribe('Tile:all-tiles-ready',(evt)=>{
    const tiles = evt.detail;
    tiles.forEach((tile, index)=>{
      tileView = new TileView(tile);
      this.container.appendChild(tileView.render(index+1));
    });
    const centerBoard = document.createElement('div');
    centerBoard.classList.add('center-board');
    centerBoard.textContent = 'Middle goes here';
    this.container.appendChild(centerBoard);
  });

};

module.exports = BoardView;
