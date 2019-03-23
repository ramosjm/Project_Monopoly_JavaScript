const PubSub = require('../helpers/pub_sub.js');
const TileView = require('./tile_view');

const BoardView = function(container,playButton){
  this.container = container;
  this.diceResult = null;
  this.playButton = playButton;
  this.players = null;
  this.tiles = null;
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
    console.log(this.players);
    const resultContainer = this.createRollResult();
    const rollDiceButton = this.createRollDiceButton(resultContainer);
    const centerBoard = this.createCenterBoard();
    centerBoard.appendChild(resultContainer);
    centerBoard.appendChild(rollDiceButton);
    this.container.appendChild(centerBoard);
    //do something with players -- they need to roll the dice.
  });

  PubSub.subscribe('Player:dice-rolled',(evt)=>{
    console.log(evt.detail);
    const die1 = evt.detail.die1;
    const die2 = evt.detail.die2;
    this.diceResult = die1 + die2;
  });

};

BoardView.prototype.createCenterBoard = function(){
  const centerBoard = document.createElement('div');
  centerBoard.classList.add('center-board');
  centerBoard.textContent = 'Middle goes here';
  return centerBoard;

};

BoardView.prototype.createRollDiceButton = function(container){
  const button = document.createElement('button');
  button.classList.add('roll-dice-button');
  button.textContent = 'Roll Dice';
  button.addEventListener('click',()=>{
    button.classList.replace('roll-dice-button','hidden');
    const currentPlayer = this.players[0]
    currentPlayer.rollDice();
    this.showRollResult(container);
    // fn required to change player - maybe increase the index by one after a roll of the dice.
    console.log(currentPlayer);
    console.log(this.tiles);

    const currentTile = document.querySelector(`.item-${currentPlayer.position} p`);
    console.log(currentTile);
    currentTile.classList.replace('hidden','show');
  });
  return button;
};

BoardView.prototype.createRollResult = function(){
  const result = document.createElement('h2');
  result.classList.add('hidden');
  return  result;
};

BoardView.prototype.showRollResult = function(result){
  console.log(result);
  result.classList.replace('hidden','result');
  console.log(this.diceResult);
  result.textContent = this.diceResult;
};


module.exports = BoardView;
