//this should be a small class with the ability to roll dice.

const assert = require('assert');
const Dice = require('../dice.js');
const Player = require('../player.js');

describe ('Player',function(){
  let player

  describe('Position', function(){
    beforeEach(function(){
      player = new Player();

    });

    it('should start at positon 1',function(){
      const expected = player.position
      assert.equal(1,expected);
    });


  });
});
