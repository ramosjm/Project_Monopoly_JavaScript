const PubSub = require('./helpers/pub_sub.js');
const Tile = require('./models/tile.js');
const BoardView = require('./views/board_view.js');
const Player = require('./models/player.js');
const Board = require('./models/board.js');
const Dice = require('./models/dice.js');

document.addEventListener('DOMContentLoaded',function(){
  console.log('hiya');

  const tileData = new Tile('http://localhost:3000/api/monopoly');
  tileData.getData();


  const contentContainer = document.querySelector('.content-container');
  const boardView = new BoardView(contentContainer);
  boardView.bindEvents();

  const player = new Player();
  const dice = new Dice();
  dice.handleDice();
  PubSub.publish('App:roll-number-ready',dice)
  const board = new Board(player,tileData);




});
