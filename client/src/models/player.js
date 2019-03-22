//player will be able to roll dice.
const Dice = require('./dice.js');

const Player = function(){
  this.position = 1;
  this.dice = null;
};

Player.prototype.isDouble = function(){
  this.rollDice();
  if (this.dice.die1 === this.dice.die2){
    this.moveTwice();
  }else{
    this.moveOnce();
  };
};

Player.prototype.rollDice = function(){
  dice = new Dice();
  this.dice = dice.handleDice();
};

Player.prototype.moveTwice = function(){
  this.moveOnce();
  this.rollDice();
  this.moveOnce();
};

Player.prototype.moveOnce = function(){
  newPosition = this.position + this.dice;
  this.position = newPosition;
};


module.exports = Player
