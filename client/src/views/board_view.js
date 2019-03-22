const PubSub = require('../helpers/pub_sub.js');
const TileView = require('./tile_view');

const BoardView = function(container){
  this.container = container;
  this.diceResult = null;

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

    const resultContainer = this.createRollResult();
    const rollDiceButton = this.createRollDiceButton(resultContainer);
    centerBoard.appendChild(resultContainer);
    centerBoard.appendChild(rollDiceButton);
    this.container.appendChild(centerBoard);
  });

  PubSub.subscribe('App:roll-number-ready',(evt)=>{
    console.log(evt.detail);
    const die1 = evt.detail.die1;
    const die2 = evt.detail.die2;
    this.diceResult = die1 + die2;
  });
};

BoardView.prototype.createRollDiceButton = function(container){
  const button = document.createElement('button');
  button.classList.add('roll-dice-button');
  button.textContent = 'Roll Dice';
  button.addEventListener('click',()=>{
    button.classList.replace('roll-dice-button','hidden');
    this.showRollResult(container);
  });
  return button;
};

BoardView.prototype.createRollResult = function(){
  const result = document.createElement('h2');
  result.classList.add('hidden');
  return  result;
};

BoardView.prototype.showRollResult = function(result){
  result.classList.replace('hidden','result');
  console.log(this.diceResult);
  result.textContent = this.diceResult;
};


module.exports = BoardView;
