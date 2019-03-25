const PubSub = require('../helpers/pub_sub.js');
const TileView = require('./tile_view.js');
const InfoView = require('./info_view.js');
const PlayerView = require('./player_view.js');

const BoardView = function(container,playButton){
  this.container = container;
  this.centerBoard = null;
  this.diceResult = null;
  this.playButton = playButton;
  this.players = null;
  this.tiles = null;
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

    const infoContainer = this.createInfoContainder();

    this.centerBoard = this.createCenterBoard();

    this.centerBoard.appendChild(resultContainer);
    this.centerBoard.appendChild(rollDiceButton);
    this.centerBoard.appendChild(infoContainer);

    this.players.forEach((player, index)=>{
      const playerViewContainer = this.createPlayerContainer(index);
      this.centerBoard.appendChild(playerViewContainer);
    });

    this.container.appendChild(this.centerBoard);

    this.renderPlayers();

  });

  PubSub.subscribe('Player:dice-rolled',(evt)=>{
    const die1 = evt.detail.die1;
    const die2 = evt.detail.die2;
    this.diceResult = die1 + die2;
  });

  PubSub.subscribe('InfoView:player-updated',(evt)=>{
    this.players[this.currentIndex-1] = evt.detail;
    this.renderPlayers();
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

    const currentPlayer = this.players[this.currentIndex];
    const currentTileText = document.querySelector(`.item-${currentPlayer.position} p`);
    currentTileText.innerHTML = '';
    currentPlayer.rollDice();

    const doubleDiceRoll = currentPlayer.dice.double;
    // if (!doubleDiceRoll) {

      this.showRollResult(container);
      const playerNumber = this.currentIndex + 1;
      this.updateCurrentTile(currentPlayer,playerNumber);
      infoContainer = document.querySelector('#info-display');
      this.buyTile(currentPlayer, infoContainer);
      this.renderPlayers();
      this.nextPlayer(button,container);
    // }else{
    //   console.log('double roll eh',currentPlayer.dice);
    //   button.textContent = 'Roll Again';
    //   currentTileText.innerHTML = '';
    //   currentPlayer.rollDice();
    //   this.showRollResult(container);

      // const playerNumber = this.currentIndex + 1;
      // this.updateCurrentTile(currentPlayer,playerNumber);
      // infoContainer = document.querySelector('#info-display');
      // this.buyTile(currentPlayer, infoContainer);
      // this.renderPlayers();
    // };

  });
  return button;
};

BoardView.prototype.renderPlayers = function(){
  // /for each player, get the container and pass throuh the index down
  this.players.forEach((player,index)=>{
    const container = document.querySelector(`#player-${index}`);
    container.innerHTML = '';
    const playerView = new PlayerView(player,container);
    playerView.render(index);
  });
};

BoardView.prototype.nextPlayer = function(button,container){
  this.currentIndex += 1;
  if (this.currentIndex >= this.players.length) {
    this.currentIndex = 0;
  };
  button.textContent = `Player ${this.currentIndex+1} Roll Dice`;
};

BoardView.prototype.buyTile = function(currentPlayer,container){
  container.innerHTML = '';
  container.classList.replace('hidden','show');
  const infoView = new InfoView(currentPlayer,container,this.currentTile);
  this.centerBoard.appendChild(infoView.render());
};

BoardView.prototype.updateCurrentTile = function(currentPlayer,playerNumber){
  const currentTileText = document.querySelector(`.item-${currentPlayer.position} p`);
  currentTileText.classList.replace('hidden-icon','show');
  currentTileText.textContent = `Player ${playerNumber} Here`;
  this.currentTile = this.tiles[currentPlayer.position-1];
};

BoardView.prototype.createPlayerContainer = function (index) {
  const playerDiv = document.createElement('div');
  playerDiv.id = `player-${index}`;
  return playerDiv;
};

BoardView.prototype.createInfoContainder = function () {
  const infoDiv = document.createElement('div');
  infoDiv.classList.add('hidden');
  infoDiv.id = 'info-display';
  return infoDiv;
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
