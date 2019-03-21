const PubSub = require('./helpers/pub_sub.js');
const Tile = require('./models/tile.js');
const BoardView = require('./views/board_view.js');

document.addEventListener('DOMContentLoaded',function(){
  console.log('hiya');

  const tileData = new Tile('http://localhost:3000/api/monopoly');
  tileData.getData();

  boardView = new BoardView();
  boardView.bindEvents();


});
