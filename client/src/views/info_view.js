const PubSub = require('../helpers/pub_sub.js');

const InfoView = function(player,container,tile){
  this.player = player;
  this.container = container;
  this.tile = tile;
};

InfoView.prototype.render = function(){

  const nameLi = this.createNameElement('li');
  this.container.appendChild(nameLi);

  const costLi = this.createCostElement('li');
  this.container.appendChild(costLi);

  const yes = this.buyButton();
  this.container.appendChild(yes);

  this.container.classList.add('tile-info');

  return this.container;
};

InfoView.prototype.buyButton = function(){
  const button = document.createElement('button');
  button.classList.add('button');
  button.textContent = 'Buy';
  button.addEventListener('click',()=>{
    this.player.buyProperty(this.tile);
    //this should appear in the top of the rolled dice comment.
    this.showBought();
    PubSub.publish('InfoView:player-updated',this.player);
  });
  return button;
};

InfoView.prototype.showBought = function(){
  this.container.innerHTML = '';
  const boughtFeedback = document.createElement('h2');
  boughtFeedback.textContent = `Player bought ${this.tile.name}!`;
  this.container.appendChild(boughtFeedback);
};


InfoView.prototype.createCostElement = function(element){
  const costLi = document.createElement(element);
  costLi.textContent = this.tile.cost
  return costLi;
};


InfoView.prototype.createNameElement = function(element){
  const nameLi = document.createElement(element);
  nameLi.textContent = this.tile.name;
  return nameLi;

};

module.exports = InfoView;
