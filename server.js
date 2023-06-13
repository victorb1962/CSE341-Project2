const express = require('express');
const app = express();
const axios = require('axios');
const bodyParser = require('body-parser');
const { auth, requiresAuth } = require('express-openid-connect');
require('dotenv').config();

const MongoClient = require('mongodb').MongoClient;
const mongodb = require('./db/connect');
const routes = require('./routes');
//const session = require('express-session');
const cookieSession = require('cookie-session');
const passport = require('passport');
require('./helpers/passport');

const port = process.env.PORT || 3000;

// Auth0 setup here and in .env file
const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.SECRET,
  baseURL: process.env.BASE_URL,
  clientID: process.env.CLIENT_ID,
  issuerBaseURL: process.env.ISSUER_BASE_URL
};

app.use(
  cookieSession({
    name: 'github-auth-session',
    keys: ['key1', 'key2']
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.get('/logout', (req, res) => {
  req.session = null;
  req.logout();
  res.redirect('/');
});

app
  .use(bodyParser.json())
  .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    // res.setHeader(
    //   'Access-Control-Allow-Headers',
    //   'Origin, X-Requested-With, Content-Type, Accept, Z-Key'
    // );
    // res.setHeader('Content-Type', 'application/json');
    // res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
  })
  .use('/', routes);

process.on('uncaughtException', (err, origin) => {
  console.log(process.stderr.fd, 'caught exception: ${err}\n' + 'Exception origin: ${origin}');
});

//Establish a connection to the mongodb database
mongodb.initDb((err, mongodb) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port);
    console.log(`Connected to DB and listening on ${port}`);
  }
});
