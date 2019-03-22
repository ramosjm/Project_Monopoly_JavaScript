//dice will have a random roll function.

const Dice = function(){
  this.die1 = null;
  this.die2 = null;
  this.double = false;
};

Dice.prototype.handleDice = function(){
  this.roll();
  this.isDouble();
};

Dice.prototype.roll = function(){
  const die1 = Math.floor(Math.random()*6)+1;
  const die2 = Math.floor(Math.random()*6)+1;
  this.die1 = die1;
  this.die2 = die2;
};

Dice.prototype.isDouble = function(){
  if(this.die1 === this.die2){
    this.double = true;
  };
};

module.exports = Dice;
