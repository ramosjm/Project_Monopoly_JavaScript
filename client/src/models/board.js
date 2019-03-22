// board will have Tiles
// board will have chance cards
// board will have COMMUNITY chest cards.
// board will have players and track position
// consider a class specifically for game logic.

const Player = require ('./player.js');


const Board = function(players){
  this.players = players;
};

module.exports = Board;
