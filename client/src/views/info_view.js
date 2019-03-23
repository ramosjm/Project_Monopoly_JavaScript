const PubSub = require('../helpers/pub_sub.js');

const InfoView = function(tile){
  this.tile = tile
  this.container = null;

};

InfoView.prototype.render = function(){
  console.log(this.tile);
  const infoDiv = document.createElement('div');

  const nameLi = this.createNameElement('li');
  infoDiv.appendChild(nameLi);

  const costLi = this.createCostElement('li');
  infoDiv.appendChild(costLi);

  const yes = this.yesButton();
  infoDiv.appendChild(yes);
  const no = this.noButton();
  infoDiv.appendChild(no);

  infoDiv.classList.add('tile-info');

  this.container = infoDiv;

  return infoDiv;
};

InfoView.prototype.yesButton = function(){
  const button = document.createElement('button');
  button.classList.add('button');
  button.textContent = 'Yes';
  button.addEventListener('click',()=>{
    PubSub.publish('InfoView:yes-clicked',this.tile);
    this.showBought();
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
