const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const fileUpload = require('express-fileupload');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const app = express();
var passport = require('passport');
var morgan = require('morgan');
var bodyParser = require('body-parser');

const port = process.env.PORT || 3000;

require('dotenv').config();

app.use(express.urlencoded( { extended: true } ));
app.use(express.static('public'));
app.use(expressLayouts);

require('./config/passport')(passport); // pass passport for configuration
//NEW
// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.json()); // get information from html forms
app.use(bodyParser.urlencoded({ extended: true }));
//NEW

//NEW2
app.use(session({
  secret: 'ilovescotchscotchyscotchscotch', // session secret
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

// routes ====================================================================== 

app.use(cookieParser('CookingBlogSecure'));
app.use(session({
  secret: 'CookingBlogSecretSession',
  saveUninitialized: true,
  resave: true
}));
app.use(fileUpload());
//NEW2

app.set('layout', './layouts/main');
app.set('view engine', 'ejs');

const routes = require('./server/routes/recipeRoutes.js')

// process the login form
app.post('/login', passport.authenticate('local-login', {
  successRedirect : '/home', // redirect to the secure profile section
  failureRedirect : '/', // redirect back to the signup page if there is an error
  failureFlash : true // allow flash messages
}));

// process the signup form
app.post('/signup', passport.authenticate('local-signup', {
  successRedirect : '/home', // redirect to the secure profile section
  failureRedirect : '/signup', // redirect back to the signup page if there is an error
  failureFlash : true // allow flash messages
}));


app.use('/', routes);

app.listen(port, ()=> console.log(`Listening to port ${port}`));

