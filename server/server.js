const express = require('express');
const app = express();
const path = require('path');


app.use(express.static('client/public'));

app.get('/', function (req, res) {
  res.sendFile('index.html');
});

app.listen(3000, function () {
  console.log(`Listening on port ${ this.address().port }`);
});
