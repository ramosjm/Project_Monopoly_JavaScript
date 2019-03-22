//player will be able to roll dice.
const Dice = require('./dice.js');

const Player = function(){
  this.position = 1;
};

Player.prototype.move = function(){
  this.rollDice();
  this.position = newPosition;

};

Player.prototype.rollDice = function(){
  dice = new Dice();
  newPosition = this.position + dice.roll();
};

module.exports = Player
