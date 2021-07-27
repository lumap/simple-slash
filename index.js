var express = require('express');
var app = express();
var axios = require('axios')

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

app.get('/facts/cats', async function (req,res){
  const fact = (await axios("https://catfact.ninja/fact")).data.fact
  res.render('facts/cats',{
    fact: fact
  })
})

app.get('/manage',async function (req,res){
  if (!req.query.token) {
    return res.render('give_id')
  } else {
    return res.render('manage',{})
  }
})



app.get('*', function(req, res){
  res.status(404).render('errors/404')
});

app.listen(8080);
console.log('Server is listening on port 8080');