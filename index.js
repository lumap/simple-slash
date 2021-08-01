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
    //get the bot id by using the token
    let id;
    try {
      id = (await axios({
        url: "https://discord.com/api/v9/oauth2/applications/@me",
        headers: {
          "Authorization": `Bot ${req.query.token}`,
          "Content-Type": "application/json"
        }
      })).data.id
    } catch (e) {
      console.log(e)
      return res.render('errors/404')
    }
    //get the bot's slash commands
    const slash_commands = (await axios({
      url: `https://discordapp.com/api/v9/applications/${id}/commands`,
      headers: {
        "Authorization": `Bot ${req.query.token}`,
        "Content-Type": "application/json"
      }
    })).data
    return res.render('manage',{
      id: id,
      token: req.query.token,
      commands: slash_commands
    })
  }
})



app.get('*', function(req, res){
  res.status(404).render('errors/404')
});

app.listen(8080);
console.log('Server is listening on port 8080');