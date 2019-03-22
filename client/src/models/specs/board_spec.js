const assert = require('assert');
const Board = require('../board.js');
const Player = require('../player.js');
const Tile = require('../tile.js');

describe('Board', function(){

  let board
  let player
  let players
  let tiles

  describe('Player Actions', function(){
    beforeEach(function(){
      player1 = new Player();
      player2 = new Player();
      players = [player1,player2];
      tiles = new Tile('http://localhost:3000/api/monopoly');
      board = new Board(players,tiles);
    });

    it ('should have players',function(){
      const expected = board.players.length;
      assert.equal(2,expected);
    });

    it ('should have tiles',function(){
      const expected = typeof(board.tiles);
      assert.equal('object',expected);
    });

  });
});
