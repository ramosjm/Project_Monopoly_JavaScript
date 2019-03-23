//player will be able to roll dice.
const PubSub = require('../helpers/pub_sub.js');
const Dice = require('./dice.js');

const Player = function(){
  this.position = 1;
  this.dice = null;
  this.property = []
};

//this will be called by the board - a button called roll will appear.
Player.bindEvents = function () {
    PubSub.subscribe('Board')
};

Player.prototype.rollDice = function(){
  dice = new Dice();
  dice.handleDice();
  this.dice = dice;
  this.isDouble();
  PubSub.publish('Player:dice-rolled',dice);
};

Player.prototype.isDouble = function(){
  if (this.dice.double == true){
    this.moveTwice();
  }else{
    this.moveOnce();
  };
};


Player.prototype.moveTwice = function(){
  this.moveOnce();
  this.rollDice();
};

Player.prototype.moveOnce = function(){
  newPosition = this.position + this.dice.die1 + this.dice.die2;
  this.position = newPosition;
};


module.exports = Player
