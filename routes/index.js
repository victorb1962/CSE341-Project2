const express = require('express');
const router = express.Router();
const path = require('path');
const isLoggedIn = require('../middleware/auth.js');
const passport = require('passport');

//Main log in page
router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../static/index.html'));
});

//Send user to get authenticated by Gihub
router.get('/auth', passport.authenticate('github', { scope: ['user:email'] }));

//If an error occurs on authentication
router.get('/auth/error', (req, res) => res.send('Unknown Error'));

//Return callback route
router.get(
  '/oauth-callback',
  passport.authenticate('github', { failureRedirect: '/auth/error' }),
  function (req, res) {
    res.redirect('/api-docs');
  }
);

//Routes
router.use('/', require('./swagger')); // use swagger route located at \routes\swagger.js
router.use('/artwork', isLoggedIn, require('./artwork'));
router.use('/contact', isLoggedIn, require('./contact'));

module.exports = router;
