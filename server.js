const express = require('express');
const app = express();
const bodyParser = require('body-parser');
require('dotenv').config();
// const axios = require('axios');
// const { auth, requiresAuth } = require('express-openid-connect');

// const MongoClient = require('mongodb').MongoClient;
const mongodb = require('./db/connect');
const routes = require('./routes');
//const session = require('express-session');
const cookieSession = require('cookie-session');
const passport = require('passport');
require('./helpers/passport');

const port = process.env.PORT || 3000;

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

// process.on('uncaughtException', (err, origin) => {
//   console.log(process.stderr.fd, 'caught exception: ${err}\n' + 'Exception origin: ${origin}');
// });

//Establish a connection to the mongodb database
mongodb.initDb((err) => {
  if (err) {
    console.log('Connection to database failed: ' + err);
  } else {
    app.listen(port);
    console.log(`Connected to DB and listening on ${port}`);
  }
});
