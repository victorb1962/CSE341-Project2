const express = require('express');
const router = express.Router();

const contactController = require('../controllers/contact');

const validation = require('../middleware/validate');
const isLoggedIn = require('../middleware/auth.js');

//Contact routes
router.get('/', isLoggedIn, contactController.getAllContact);
router.get('/:id', isLoggedIn, contactController.getContact);
router.post('/', isLoggedIn, validation.saveContact, contactController.createContact);
router.put('/:id', isLoggedIn, validation.saveContact, contactController.updateContact);
router.delete('/:id', isLoggedIn, contactController.deleteContact);

module.exports = router; 