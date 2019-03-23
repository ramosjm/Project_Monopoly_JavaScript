const TileView = function(tile){
 this.id = tile.tile_id;
 this.name = tile.name;
 this.cost = tile.cost;

};


TileView.prototype.render = function(index){
  const tileDiv = document.createElement('div');
  tileDiv.classList.add(`item-${index}`);
  tileDiv.textContent = this.name;
  const icon = this.createPlayerIcon();
  const cost = this.createCostElement();
  tileDiv.appendChild(icon);
  tileDiv.appendChild(cost);
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
  cost.textContent = this.cost;
  return cost
}

module.exports = TileView;
