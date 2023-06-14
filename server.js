const express = require('express');
const { auth, requiresAuth } = require('express-openid-connect');
require('dotenv').config();

const mongodb = require('./db/connect');
const swaggerUi = require('swagger-ui-express');
// const swaggerDocument = require('./swagger.json');
const swaggerDocument = require('./swaggerDesign.json');

const port = process.env.PORT || 3000;
const app = express();

// Auth0 setup here and in .env file
const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.SECRET,
  baseURL: process.env.BASE_URL,
  clientID: process.env.CLIENT_ID,
  issuerBaseURL: process.env.ISSUER_BASE_URL
};

// establish a connection to the mongodb database
mongodb.initDb((err) => {
  if (err) {
    console.log('Connection to database failed: ' + err);
  } else {
    console.log(`Connected to DB and listening on ${port}`);
  }
});

/*
const bodyParser = require('body-parser');
app
  .use(bodyParser.json())
  .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
  })

process.on('uncaughtException', (err, origin) => {
  console.log(process.stderr.fd, `Caught exception: ${err}\n` + `Exception origin: ${origin}`);
});
*/

app
  .use('/', require('./routes'));

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

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
