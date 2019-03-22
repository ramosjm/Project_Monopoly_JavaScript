const assert = require('assert');
const Dice = require('../dice.js');

describe('Dice', function(){

  let dice
  let rollData

  describe('Dice Roll', function(){
    beforeEach(function () {
        dice = new Dice();
        dice.handleDice();
        rollData = [1,2,3,4,5,6,7,8,9,10,11,12]
    });

    it('should set die 1',function(){
      const expected = rollData.includes(dice.die1);
      assert.equal(true,expected);
    });

    it('should set die 2',function(){
      const expected = rollData.includes(dice.die2);
      assert.equal(true,expected);
    });

    it('should get this.double',function(){
      const expected = dice.double;
      assert.equal(false,expected);
    });

    it('should set this.double to true',function(){
      const testDice = new Dice();
      testDice.double = true;
      const expected = testDice.double;
      assert.equal(true,expected);
    });

  });


})
