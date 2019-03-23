//player will be able to roll dice.
const PubSub = require('../helpers/pub_sub.js');
const Dice = require('./dice.js');

const Player = function(){
  this.position = 1;
  this.dice = null;
  this.property = []
};

//this will be called by the board - a button called roll will appear.

Player.prototype.rollDice = function(){
  dice = new Dice();
  dice.handleDice();
  this.dice = dice;
  this.moveOnce();
  PubSub.publish('Player:dice-rolled',dice);
};

Player.prototype.moveOnce = function(){
  newPosition = this.position + this.dice.die1 + this.dice.die2;
  if (newPosition > 40){
    this.position = newPosition - 40
  }else{
    this.position = newPosition;
  }
};




module.exports = Player
