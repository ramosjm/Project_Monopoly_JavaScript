const TileView = function(tile){
  this.tile = tile;

};

TileView.prototype.render = function(index){
  const tileDiv = document.createElement('div');
  tileDiv.classList.add(`item-${index}`);
  tileDiv.textContent = this.tile.name;
  const icon = this.createPlayerIcon();
  const cost = this.createCostElement();
  tileDiv.appendChild(icon);
  if (this.tile.cost != 'none') {
    tileDiv.appendChild(cost);
  };

  return tileDiv;
};

TileView.prototype.createPlayerIcon = function () {
  const icon = document.createElement('p');
  icon.classList.add('hidden-icon');
  icon.textContent ='Player Here';
  return icon;
};

TileView.prototype.createCostElement = function(){
  const cost = document.createElement('p');
  cost.classList.add('cost-item');
  cost.textContent = this.tile.cost;
  return cost
}

module.exports = TileView;
