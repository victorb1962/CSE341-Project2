const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./db/connect');

const port = process.env.PORT || 8080;
const app = express();

app
  .use(bodyParser.json())
  // vb_start: Add code to make work for React...using CORS
  .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Use '*' for localhost...but consider replacing with specific URL to make secure in production
    // i.e. If running frontend app (i.e. netlify.app) you'll want to add URL here is replacing '*'
    res.setHeader(
      // authority to do DB CRUD
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Z-Key'
    );
    // res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
  })
  // vb_end:
  .use('/', require('./routes'));

mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port);
    console.log(`Connected to DB and listening on ${port}`);
  }
});
