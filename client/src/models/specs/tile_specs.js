const assert = require('assert');
const Tile = require('../tile.js');

describe ('Tiles',function(){
  let tile

  describe('Content of Tile', function(){
    beforeEach(function(){
      tile = new Tile();
    });

    it('should have a tile id',function(){
      assert.equal(1,tile.getID());
    });


  });



});
