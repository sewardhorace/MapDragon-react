var path = require('path');
var express = require('express');
var bodyParser = require("body-parser");
var monk = require('monk');
var db = monk('localhost:27017/test');

var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/static', express.static(__dirname + '/dist'));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});

//JSON api
app.post('/maps', function(req, res) {
  console.log('POST request to /maps recieved');
  var map = req.body.map;
  var maps = db.get('maps');
  maps.insert(map)
  .on('complete', function(err, doc){
    if (err) {
      console.log("Error: " + err);
    } else {
      console.log("Complete: " + doc);
    }
  });
});
app.get('/maps', function(req, res){
  console.log('GET request to /maps recieved');
  var maps = db.get('maps');
  maps.find({}, function(err, docs){
    if (err){
      console.log("Error: " + err);
      res.send(err);
    } else {
      console.log("Complete: " + docs);
      console.log(docs);
      res.send(docs);
    }
  });
});

app.listen(3000, 'localhost', function(err) {
  if (err) {
    console.log(err);
    return;
  }
  console.log('MapDragon listening at http://localhost:3000');
});
