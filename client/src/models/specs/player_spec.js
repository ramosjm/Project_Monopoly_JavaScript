//this should be a small class with the ability to roll dice.

const assert = require('assert');
const Dice = require('../dice.js');
const Player = require('../player.js');

describe ('Player',function(){
  let player
  let dice
  let testPlayer

  describe('Position', function(){
    beforeEach(function(){
      player = new Player();
      dice = new Dice();

    });

    it('should start at positon 1',function(){
      const expected = player.position;
      assert.equal(1,expected);
    });

    it('should move by dice roll',function(){
      dice.die1 = 3;
      dice.die2 = 2;
      player.dice = dice
      player.moveOnce();
      const expected = player.position;
      assert.equal(6,expected);
    });


  });
});
