const express = require('express');
const router = express.Router();

const artworkController = require('../controllers/artwork');

const validation = require('../middleware/validate');
const isLoggedIn = require('../middleware/auth.js');

//Artwork routes
router.get('/', isLoggedIn, artworkController.getAllArtwork);
router.get('/:id', isLoggedIn, artworkController.getArtwork);
router.post('/', isLoggedIn, validation.saveArtwork, artworkController.createArtwork);
router.put('/:id', isLoggedIn, validation.saveArtwork, artworkController.updateArtwork);
router.delete('/:id', isLoggedIn, artworkController.deleteArtwork);

module.exports = router; 