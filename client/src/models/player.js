//player will be able to roll dice.
const PubSub = require('../helpers/pub_sub.js');
const Dice = require('./dice.js');

const Player = function(){
  this.position = 1;
  this.dice = null;
  this.property = [];
  this.cash = 1500;
};

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

Player.prototype.buyProperty = function(tile){
  this.reduceCash(tile.cost);
  this.addProperty(tile);
};

Player.prototype.addProperty = function(tile){
  this.property.push(tile);
};

Player.prototype.reduceCash = function(cost){
  this.cash -= cost;
};




module.exports = Player
