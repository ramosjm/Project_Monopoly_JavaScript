const PlayerView = function(player,container){
  this.player = player;
  this.container = container;
};


PlayerView.prototype.render = function(index){

  const header = this.createHeader('h2',index);
  this.container.appendChild(header);

  const cash = this.createPlayerCash('p');
  this.container.appendChild(cash);

  const propertyHeader = document.createElement('h3');
  propertyHeader.textContent = 'Owned Properties:'
  this.container.appendChild(propertyHeader);

  this.player.property.forEach((item, index)=>{
    const propertyElement = this.createPlayerProperty('li',index);
    propertyElement.textContent = item.name;
    this.container.appendChild(propertyElement);
  });
};

PlayerView.prototype.createPlayerCash = function(element){
  const cashParagraph = document.createElement(element);
  cashParagraph.textContent = `Cash: ${this.player.cash}`;
  return cashParagraph;
};

PlayerView.prototype.createPlayerProperty = function(element,index){
  const propertyLi = document.createElement(element);
  propertyLi.textContent = this.player.property;
  return propertyLi;
};

PlayerView.prototype.createHeader = function(element, index){
  const headerElement = document.createElement(element);
  headerElement.id = 'player-header';
  headerElement.textContent = `Player: ${index+1}`;
  return headerElement;
};

module.exports = PlayerView;
