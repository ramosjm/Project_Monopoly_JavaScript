const TileView = function(tile){
 this.id = tile.tile_id;
 this.name = tile.name;

};


TileView.prototype.render = function(index){
  const tileDiv = document.createElement('div');
  tileDiv.classList.add(`item-${index}`);
  tileDiv.textContent = this.name;
  const icon = this.createPlayerIcon();
  tileDiv.appendChild(icon);
  return tileDiv;
};

TileView.prototype.createPlayerIcon = function () {
  const icon = document.createElement('p');
  icon.classList.add('hidden');
  icon.textContent ='Player Here';
  return icon;
};

module.exports = TileView;
