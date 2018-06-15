// NOTE: If you look in the package.json file, you will see a script called "start". This is called to start the server.

const express = require('express');
const fs = require('fs'); // file crap

// the || operator means 'or'. Of the PORT enviornment variable does not exist, we will set it to 3000
const port = process.env.PORT || 3000; // store the port which heroku sets for our app

// for website templates
const hbs = require('hbs');

console.log('This is the directory: ' + __dirname);

/**
 * Middle ware allows you to add on to the existing functionality that express has.
 * to register middleware, you call: `app.use()`
 */

var app = express();

// partials are reusable code
// partials are things you can put in many html files (footer, copywrite)
hbs.registerPartials(__dirname + '/views/partials');


// set an express settigs. The default render folder is views
app.set('view engine', 'hbs');


// next is a parameter that tells express when the middleware is done.
// when next is called, the function is done
// NOTE: if you never call next, the function won't end
/**
 * The `req` parameter has all of the information about the request to the page from the user
 */
app.use(function(req, res, next) {
  var now = new Date().toString();

  console.log(`${now}: ${req.method} ${req.url}`);
  next();
});

// uncomment this when updating the site. Because we don't call next, the function never exits
// app.use(function(req,res,next) {
//   res.render('maintenance.hbs');
// });


// express.static takes the absolute path to the folder
// this makes all files in `public` viewable
app.use(express.static(__dirname + '/public'));

// this is a helper (partial function )
// This function can be used within the templates like this: {{getCurrentYear}}
hbs.registerHelper('getCurrentYear', function() {
  return new Date().getFullYear();
});

// helper function.

// To pass parameters to helper functions you write {{function-name param1 param2 ....}}

hbs.registerHelper('screamIt', function(text) {
  return text.toUpperCase();
});


// root of the site
app.get('/', function(req, res) {
  // res.send('<h1>Hello Expres!</h1>');


  // here i am sending to a template file
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    pageHead: '/',
    welcomeMessage: "Welcome to my site!"
  });


  /**
    // if you send an object, you can send JSON
    res.send({
      name: 'Daniel',
      likes: ['numbers','biking','food']
    });
    **/
});


app.get('/projects', function(req, res) {
  res.render('projects.hbs', {
    pageTitle: 'Projects',
    pageHead: '/projects',
    welcomeMessage: 'YOU ARE ON THE BEST WEBSITE EVER!!!!!!!!!!!'
  });
});


app.get('/about', function(req, res) {
  // render template. The default render folder is views
  res.render('about.hbs', {
    pageTitle: 'About Page',
    pageHead: '/about'
  });
});



//send a file
app.get('/help', function(req, res) {
  res.sendFile(__dirname + '/public/help.html');
});

app.get('/bad', function(req, res) {
  res.send({
    error: "Bad connection."
  });
});
// any port
app.get('*', function(req, res) {
  res.send('404 Error. File not found.');
});


// Because heroku sets what port to listen on, we are going to use their enviornment variable that heroku sets (process.env.PORT)
// If you type 'env' on mac, it lists the paths.
app.listen(port, function() {
  console.log('server is up on port 3000');
});