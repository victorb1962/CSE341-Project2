const express = require('express');
const router = express.Router();

const contactController = require('../controllers/contact');
const validation = require('../middleware/validate');

router.get('/', contactController.getAllContact);

router.get('/:id', contactController.getContact);

router.post('/', validation.saveContact, contactController.createContact);

router.put('/:id', validation.saveContact, contactController.updateContact);

router.delete('/:id', contactController.deleteContact);

module.exports = router;
