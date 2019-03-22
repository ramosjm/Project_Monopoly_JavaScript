//player will be able to roll dice.
const Dice = require('./dice.js');

const Player = function(){
  this.position = 1;
  this.dice = null;
};

//this will be called by the board - a button called roll will appear.
Player.prototype.isDouble = function(){
  this.rollDice();
  if (this.dice.double == true){
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
  newPosition = this.position + this.dice.die1 + this.dice.die2;
  this.position = newPosition;
};


module.exports = Player
