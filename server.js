const express = require('express');
const app = express();
require('dotenv').config();

// const bodyParser = require('body-parser');
const mongodb = require('./db/connect');

// Auth0 setup here and in .env file
const { auth, requiresAuth } = require('express-openid-connect');
const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.SECRET,
  baseURL: process.env.BASE_URL,
  clientID: process.env.CLIENT_ID,
  issuerBaseURL: process.env.ISSUER_BASE_URL
};

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));

// req.isAuthenticated is provided from the auth router
app.get('/', (req, res) => {
  res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});

// Check if user has already logged-in
app.get('/profile', requiresAuth(), (req, res) => {
  res.send(JSON.stringify(req.oidc.user));
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  } // else {
    // app.listen(port);
    // console.log(`Connected to DB and listening on ${port}`);
  // }
});
