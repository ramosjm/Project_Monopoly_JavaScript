const PubSub = require('../helpers/pub_sub.js');
const TileView = require('./tile_view.js');
const InfoView = require('./info_view.js');

const BoardView = function(container,playButton){
  this.container = container;
  this.centerBoard = null;
  this.diceResult = null;
  this.playButton = playButton;
  this.players = null;
  this.tiles = null;
  this.currentTileText = null;
  this.currentTile = null;
  this.currentIndex = 0;
};

BoardView.prototype.bindEvents = function() {

  this.playButton.addEventListener('click',()=>{
    const dropDown = document.querySelector('#game-dropdown');
    PubSub.publish('BoardView:selection',dropDown.value);
    const form =document.querySelector('#start-game-form');
    form.classList.replace('show','hidden');
    this.container.classList.replace('hidden','content-container');
  });

  PubSub.subscribe('Tile:all-tiles-ready',(evt)=>{
    this.tiles = evt.detail;
    const tiles = evt.detail;
    tiles.forEach((tile, index)=>{
      tileView = new TileView(tile);
      this.container.appendChild(tileView.render(index+1));
    });

  });

  PubSub.subscribe('Board:players-ready',(evt)=>{
    this.players = evt.detail;
    const resultContainer = this.createRollResult();
    const playerIndex = 0
    const rollDiceButton = this.createRollDiceButton(resultContainer,playerIndex);
    this.centerBoard = this.createCenterBoard();
    this.centerBoard.appendChild(resultContainer);
    this.centerBoard.appendChild(rollDiceButton);
    this.container.appendChild(this.centerBoard);
  });

  PubSub.subscribe('Player:dice-rolled',(evt)=>{
    const die1 = evt.detail.die1;
    const die2 = evt.detail.die2;
    this.diceResult = die1 + die2;
  });

};

BoardView.prototype.createCenterBoard = function(){
  const centerBoard = document.createElement('div');
  centerBoard.classList.add('center-board');
  return centerBoard;

};

BoardView.prototype.createRollDiceButton = function(container, index){
  const button = document.createElement('button');
  button.classList.add('roll-dice-button');
  button.textContent = 'Roll Dice';
  button.addEventListener('click',()=>{

    const currentPlayer =this.players[this.currentIndex];
    this.currentTileText = document.querySelector(`.item-${currentPlayer.position} p`);
    this.currentTileText.innerHTML = '';

    currentPlayer.rollDice();
    const doubleDiceRoll = currentPlayer.dice.double;
    if (doubleDiceRoll) {
      console.log('double roll eh',currentPlayer.dice);
      button.textContent = 'Roll Again';
    };

    this.showRollResult(container);

    this.currentTileText = document.querySelector(`.item-${currentPlayer.position} p`);
    const playerNumber = this.currentIndex + 1;
    this.currentTileText.classList.replace('hidden-icon','show');
    this.currentTileText.textContent = `Player ${playerNumber} Here`;
    this.currentTile = this.tiles[currentPlayer.position];
    this.buyTile();
    this.nextPlayer(button,container);
  });
  return button;
};

BoardView.prototype.nextPlayer = function(button,container){
  this.currentIndex += 1;
  if (this.currentIndex >= this.players.length) {
    this.currentIndex = 0;
  };
  button.textContent = `Player ${this.currentIndex+1} Roll Dice`;
};

BoardView.prototype.buyTile = function(){
  const infoView = new InfoView(this.currentTile);
  this.centerBoard.appendChild(infoView.render());
};

BoardView.prototype.createRollResult = function(){
  const result = document.createElement('h2');
  result.classList.add('hidden');
  return result;
};

BoardView.prototype.showRollResult = function(result){
  result.classList.replace('hidden','result');
  result.textContent = `Player ${this.currentIndex+1} rolled ${this.diceResult}`;
};


module.exports = BoardView;
