// board will have Tiles
// board will have chance cards
// board will have COMMUNITY chest cards.
// board will have players and track position
// consider a class specifically for game logic.
const PubSub = require('../helpers/pub_sub.js');
const Player = require('./player.js');

const Board = function(tiles){
  this.players = [];
  this.tiles = tiles;

};

Board.prototype.bindEvents = function(){
  PubSub.subscribe('BoardView:selection',(evt)=>{
    this.generatePlayers(evt.detail);
    PubSub.publish('Board:players-ready',this.players);
  });

};

Board.prototype.generatePlayers = function(players){
  for (i = 0; i<players; i++){
    newPlayer = new Player();
    this.players.push(newPlayer);
  };
};

module.exports = Board;
