var express = require('express');
var hbs = require('hbs');
const fs = require('fs');
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));


var myLogger = (req, res, next) => {
  var now = new Date().toString();
  var log = `${now} : ${req.method} : ${req.url}`;
  console.log(log);
  fs.appendFile('server.log', log + '\n');
  next();
}

app.use(myLogger);


var myMaintenace = (req, res, next) => {
  res.render('Maintenance.hbs');
  next();
};
  
app.use(myMaintenace);


// app.get('/', function(req, res) {
//   res.send('Hello World')
// });

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});


app.get('/', function(req, res) {
  res.render('home.hbs', {
    pageTitle: 'Home Page Title',
    welcomeMessage: 'This is the new Welcome page ',

  })
});



app.get('/about', function(req, res) {
  res.render('about.hbs', {
    pageTitle: 'About Page Title',

  });
});

app.get('/bad', function(req, res) {
  res.send({
    eror: 'Hello World'
  })
});

app.listen(3000, function() {
  console.log('Example app listening on port 3000!')
});
