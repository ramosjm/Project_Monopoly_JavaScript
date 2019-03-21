const PubSub = require('./helpers/pub_sub.js');
const Tile = require('./models/tile.js');

document.addEventListener('DOMContentLoaded',function(){
  console.log('hiya');

  const tileData = new Tile('http://localhost:3000/api/monopoly');
  tileData.getData();
  console.log(tileData.getData());


});
