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

  const yes = this.yesButton();
  this.container.appendChild(yes);
  const no = this.noButton();
  this.container.appendChild(no);

  this.container.classList.add('tile-info');

  return this.container;
};

InfoView.prototype.yesButton = function(){
  const button = document.createElement('button');
  button.classList.add('button');
  button.textContent = 'Yes';
  button.addEventListener('click',()=>{
    this.player.buyProperty(this.tile);
    this.showBought();
    PubSub.publish('InfoView:player-updated',this.player);
  });
  return button;
};

InfoView.prototype.showBought = function(){
  this.container.innerHTML = '';
  const boughtFeedback = document.createElement('h2');
  boughtFeedback.textContent = 'Property Purchased!';
  this.container.appendChild(boughtFeedback);
};

InfoView.prototype.noButton = function () {
  const button = document.createElement('button');
  button.classList.add('button');
  button.textContent = 'Nope';
  button.addEventListener('click',()=>{

  });
  return button;
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
