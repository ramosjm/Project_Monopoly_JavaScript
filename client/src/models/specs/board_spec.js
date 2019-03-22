const assert = require('assert');
const Board = require('../board.js');
const Player = require('../player.js');

describe('Board', function(){

  let board
  let player
  let players

  describe('Player Actions', function(){
    beforeEach(function(){
      player1 = new Player();
      player2 = new Player();
      players = [player1,player2];
      board = new Board(players);
    });

    it ('should have players',function(){
      const expected = board.players.length;
      assert.equal(2,expected);
    });
  });
});
