//player will be able to roll dice.
const PubSub = require('../helpers/pub_sub.js');
const Dice = require('./dice.js');

const Player = function(){
  this.position = 1;
  this.dice = null;
  this.property = [];
  this.cash = 1500;
};

//this will be called by the board - a button called roll will appear.
Player.prototype.bindEvents = function(){
  PubSub.subscribe('InfoView:yes-clicked',(evt)=>{
    this.buyProperty(evt.detail);
    console.log(evt.detail);
    console.log(this.cash);
  });
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
};

Player.prototype.reduceCash = function(cost){
  this.cash -= cost;
};




module.exports = Player
