const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  try {
    const result = await mongodb.getDb().db().collection('artwork').find();
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getSingle = async (req, res) => {
  try {
    const artworkId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db().collection('artwork').find({ _id: artworkId });
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists[0]);
    });
  } catch (err) {
    res.status(500).json(err);
  }
};

const createArtwork = async (req, res) => {
  try {
    const artwork = {
      artTitle: req.body.artTitle,
      artYear: req.body.artYear,
      artPeriod: req.body.artPeriod,
      artDesc: req.body.artDesc,
      artType: req.body.artType,
      artLocation: req.body.artLocation,
      artDonated: req.body.artDonated,
      artFile: req.body.artFile
    };
    const response = await mongodb.getDb().db().collection('artwork').insertOne(artwork);
    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res.status(500).json(response.error || 'Some error occurred while creating the artwork.');
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

const updateArtwork = async (req, res) => {
  try {
    const artworkId = new ObjectId(req.params.id);
    // be aware of updateOne if you only want to update specific fields
    const artwork = {
      artTitle: req.body.artTitle,
      artYear: req.body.artYear,
      artPeriod: req.body.artPeriod,
      artDesc: req.body.artDesc,
      artType: req.body.artType,
      artLocation: req.body.artLocation,
      artDonated: req.body.artDonated,
      artFile: req.body.artFile
    };
    const response = await mongodb
      .getDb()
      .db()
      .collection('artwork')
      .replaceOne({ _id: artworkId }, artwork);
    console.log(response);
    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || 'Some error occurred while updating the artwork.');
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

const deleteArtwork = async (req, res) => {
  try {
    const artworkId = new ObjectId(req.params.id);
    const response = await mongodb
      .getDb()
      .db()
      .collection('artwork')
      .remove({ _id: artworkId }, true);
    console.log(response);
    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || 'Some error occurred while deleting the artwork.');
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  getAll,
  getSingle,
  createArtwork,
  updateArtwork,
  deleteArtwork
};
