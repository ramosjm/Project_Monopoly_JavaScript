const express = require('express');
const app = express();
const path = require('path');
const parser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;

const createRouter = require('./helpers/create_router.js');

const publicPath = path.join(__dirname,'../client/public');
app.use(express.static(publicPath));

MongoClient.connect('mongodb://localhost:27017',{useNewUrlParser: true})
  .then((client)=>{
    const db = client.db('monopoly');
    const tilesCollection = db.collection('tiles');
    const monopolyRouter = createRouter(tilesCollection);
    app.use('/api/monopoly',monopolyRouter);
  })
  .catch(console.error);

app.use(parser.json());

app.listen(3000, function () {
  console.log(`Listening on port ${ this.address().port }`);
});
