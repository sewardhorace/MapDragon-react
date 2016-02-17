var path = require('path');
var express = require('express');
var bodyParser = require("body-parser");
var monk = require('monk');
var db = monk('localhost:27017/test');
var passport = require('passport');
var LocalStrategy = require('passport-local');

var app = express();


//user authentication
passport.use(new LocalStrategy(
  function(username, password, done){
    var users = db.get('users');
    users.findOne({username: username})
    .on('complete', function(err, doc){
      if (err){
        return done(err);
      } else {
        //TODO this doesn't check password at all
        var user = doc;
        return done(null, user);
      }
    });
  }
));

//TODO understand these
// passport.serializeUser(function(user, done) {
//   done(null, user.id);
// });
// passport.deserializeUser(function(id, done) {
//   User.findById(id, function (err, user) {
//     done(err, user);
//   });
// });

app.use('/static', express.static(__dirname + '/dist'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/login', function(req, res){

});

app.post('/maps',
  passport.authenticate('local', { failureRedirect: '/fail' }),
  function(req, res) {

  console.log('POST request to /maps recieved');
  var map = req.body.map;
  var maps = db.get('maps');
  maps.insert(map)
  .on('complete', function(err, doc){
    if (err) {
      console.log("Error: " + err);
      res.send(err);
    } else {
      console.log("Complete: ");
      console.log(doc);
      res.send("saved! " + doc);
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
      console.log("Complete: ");
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
