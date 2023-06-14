const express = require('express');
const router = express.Router();

const artworkController = require('../controllers/artwork');
const validation = require('../middleware/validate');

router.get('/', artworkController.getAllArtwork);

router.get('/:id', artworkController.getArtwork);

router.post('/', validation.saveArtwork, artworkController.createArtwork);

router.put('/:id', validation.saveArtwork, artworkController.updateArtwork);

router.delete('/:id', artworkController.deleteArtwork);

module.exports = router;
