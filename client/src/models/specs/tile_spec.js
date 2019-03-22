const assert = require('assert');
const Tile = require('../tile.js');

describe ('Tiles',function(){
  let tile

  describe('Content of Tile', function(){
    beforeEach(function(){
      tile = new Tile();
    });

    it('should have a tile id',function(){
      console.log(tile);
      assert.equal(1,tile.data[0].tile_id);
    });

    it('should have a name', function(){
      assert.equal('GO',tile.getName())
    });


  });



});
