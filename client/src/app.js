const PubSub = require('./helpers/pub_sub.js');
const Tile = require('./models/tile.js');
const BoardView = require('./views/board_view.js');
const Player = require('./models/player.js');
const Board = require('./models/board.js');

document.addEventListener('DOMContentLoaded',function(){
  console.log('hiya');

  const tileData = new Tile('http://localhost:3000/api/monopoly');
  tileData.getData();

  const player = new Player();
  const board = new Board(player,tileData);

  const contentContainer = document.querySelector('.content-container');
  const boardView = new BoardView(contentContainer);
  boardView.bindEvents();


});
