const express = require('express');
const router = express.Router();

router.use('/', require('./swagger'));  // use swagger routes located at \routes\swagger.js
router.use('/artwork', require('./artwork'));
router.use('/contact', require('./contact'));

module.exports = router;
