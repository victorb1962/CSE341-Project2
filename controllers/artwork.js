const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

//Get all artwork
const getAllArtwork = async (req, res, next) => {
  try {
    mongodb
      .getDb()
      .db()
      .collection('artwork')
      .find()
      .toArray((err, lists) => {
        if (err) {
          res.status(400).json({ message: err });
        }
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists);
      });
  } catch (err) {
    res.status(500).json(err);
  }
};

//GET single artwork based on id
const getArtwork = async (req, res, next) => {
  try {
    const artworkId = new ObjectId(req.params.id);
    mongodb
      .getDb()
      .db()
      .collection('artwork')
      .find({ _id: artworkId })
      .toArray((err, result) => {
        if (err) {
          res.status(400).json({ message: err });
        }
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result[0]);
      });
  } catch (err) {
    res.status(500).json(err);
  }
};

//POST artwork
const createArtwork = async (req, res, next) => {
  try {
    //Data to add
    const artwork = {
      artTitle: req.body.artTitle,
      artYear: req.body.artYear,
      artPeriod: req.body.artPeriod,
      artDesc: req.body.artDesc,
      artType: req.body.artType,
      artLocation: req.body.artLocation,
      artDonated: req.body.artDonated,
      artFile: req.body.artFile,
    };

    //Operation
    const result = await mongodb
      .getDb()
      .db()
      .collection('artwork')
      .insertOne(artwork);

    //Response
    if (result.acknowledged) {
      res.status(201).json(result);
    } else {
      res
        .status(500)
        .json(
          result.error || 'Some error occurred while creating the artwork.'
        );
    }

    //Console confirmation
    console.log(`${result.modifiedCount} document(s) created.`);
  } catch (err) {
    res.status(500).json(err);
  }
};

//PUT artwork
const updateArtwork = async (req, res, next) => {
  try {
    //ID for update
    const artworkId = new ObjectId(req.params.id);
    //Data to update
    const artwork = {
      artTitle: req.body.artTitle,
      artYear: req.body.artYear,
      artPeriod: req.body.artPeriod,
      artDesc: req.body.artDesc,
      artType: req.body.artType,
      artLocation: req.body.artLocation,
      artDonated: req.body.artDonated,
      artFile: req.body.artFile,
    };

    //Operation
    const result = await mongodb
      .getDb()
      .db()
      .collection('artwork')
      .replaceOne({ _id: artworkId }, artwork);

    //Response
    if (result.acknowledged) {
      res.status(201).json(result);
    } else {
      res
        .status(500)
        .json(
          result.error || 'Some error occurred while creating the artwork.'
        );
    }

    //Console confirmation
    console.log(`${result.modifiedCount} document(s) created.`);
  } catch (err) {
    res.status(500).json(err);
  }
};

//DELETE artwork
const deleteArtwork = async (req, res, next) => {
  try {
    //ID for delete
    const artworkId = new ObjectId(req.params.id);

    //Operation
    const result = await mongodb
      .getDb()
      .db()
      .collection('artwork')
      .deleteOne({ _id: artworkId });

    //Response
    if (result.deletedCount > 0) {
      res.status(200).send();
    } else {
      res
        .status(500)
        .json(
          result.error || 'Some error occurred while deleting the artwork.'
        );
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  getAllArtwork,
  getArtwork,
  createArtwork,
  updateArtwork,
  deleteArtwork 
};
