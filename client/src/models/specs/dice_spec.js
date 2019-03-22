const assert = require('assert');
const Dice = require('../dice.js');

describe('Dice', function(){

  let dice
  let rollData

  describe('Dice Roll', function(){
    beforeEach(function () {
        dice = new Dice();
        rollData = [1,2,3,4,5,6,7,8,9,10,11,12]
    });

    it('should return a random number between 1 and 12',function(){
      expected = rollData.includes(dice.roll());
      assert.equal(true,expected);
    });

  });


})
