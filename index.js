var express = require('express');
var app = express();

// set the view engine to ejs
app.set('view engine', 'ejs');

app.use("/assets",express.static(__dirname + "/assets"));

// index page
app.get('/', function(req, res) {
  res.render('index');
});

// about page
app.get('/about', function(req, res) {
  res.render('about');
});

app.get('*', function(req, res){
  res.status(404).send('what???');
});

app.listen(8080);
console.log('Server is listening on port 8080');