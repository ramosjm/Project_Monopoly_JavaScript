const PubSub = require('./helpers/pub_sub.js');
const Tile = require('./models/tile.js');
const BoardView = require('./views/board_view.js');
const Board = require('./models/board.js');


document.addEventListener('DOMContentLoaded',function(){
  console.log('hiya');

  const tileData = new Tile('http://localhost:3000/api/monopoly');
  tileData.getData();

  const board = new Board(tileData);
  // this will subscribe to the result of an input form.
  board.bindEvents();

  const playButton = document.querySelector('#play-button');
  const contentContainer = document.querySelector('#monopoly-board');
  const boardView = new BoardView(contentContainer,playButton);
  boardView.bindEvents();

});
