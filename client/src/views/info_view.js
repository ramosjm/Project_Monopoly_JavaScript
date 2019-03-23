const PubSub = require('../helpers/pub_sub.js');

const InfoView = function(tile){
  this.tile = tile

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

  return infoDiv;
};

InfoView.prototype.yesButton = function(){
  const button = document.createElement('button');
  button.classList.add('yes-btn');
  button.textContent = 'Yes';
  return button;
};

InfoView.prototype.noButton = function () {
  const button = document.createElement('button');
  button.classList.add('no-btn');
  button.textContent = 'Nope';
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
