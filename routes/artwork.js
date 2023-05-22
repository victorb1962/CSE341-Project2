const express = require('express');
const router = express.Router();

const artworkController = require('../controllers/artwork');

router.get('/', artworkController.getAll);

router.get('/:id', artworkController.getSingle);

router.post('/', artworkController.createArtwork);

router.put('/:id', artworkController.updateArtwork);

router.delete('/:id', artworkController.deleteArtwork);

module.exports = router;
