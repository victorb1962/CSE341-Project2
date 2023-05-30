const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;
const passwordUtil = require('../config/passwordComplexityCheck');

const getAll = (req, res) => {
  mongodb
    .getDb()
    .db()
    .collection('contact')
    .find()
    .toArray((err, lists) => {
      if (err) {
        res.status(400).json({ message: err });
      }
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);
    });
};

const getSingle = (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid contact id to find a contact.');
  }
  const contactId = new ObjectId(req.params.id);
  mongodb
    .getDb()
    .db()
    .collection('contact')
    .find({ _id: contactId })
    .toArray((err, result) => {
      if (err) {
        res.status(400).json({ message: err });
      }
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(result[0]);
    });
};

const createContact = async (req, res) => {
  const contact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    phone: req.body.phone,
    role: req.body.role,
    username: req.body.username,
    password: req.body.password
  };

  if (!req.body.username || !req.body.password) {
    res.status(400).send({ message: 'Login details can not be empty.' });
    return;
  }
  const password = req.body.password;
  const passwordCheck = passwordUtil.passwordPass(password);
  if (passwordCheck.error) {
    res.status(400).send({ message: passwordCheck.error });
    return;
  }

  const response = await mongodb.getDb().db().collection('contact').insertOne(contact);
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res.status(500).json(response.error || 'Some error occurred while creating the contact.');
  }
};

const updateContact = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid contact id to update a contact.');
  }

  if (!req.body.username || !req.body.password) {
    res.status(400).send({ message: 'Login details can not be empty.' });
    return;
  }
  const password = req.body.password;
  const passwordCheck = passwordUtil.passwordPass(password);
  if (passwordCheck.error) {
    res.status(400).send({ message: passwordCheck.error });
    return;
  }

  const contactId = new ObjectId(req.params.id);
  // be aware of updateOne if you only want to update specific fields
  const contact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    phone: req.body.phone,
    role: req.body.role,
    username: req.body.username,
    password: req.body.password
  };
  const response = await mongodb
    .getDb()
    .db()
    .collection('contact')
    .replaceOne({ _id: contactId }, contact);
  console.log(response);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while updating the contact.');
  }
};

const deleteContact = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid contact id to delete a contact.');
  }
  const contactId = new ObjectId(req.params.id);

  if (!contactId) {
    res.status(400).send({ message: 'Invalid Id Supplied' });
    return;
  }

  const response = await mongodb
    .getDb()
    .db()
    .collection('contact')
    .remove({ _id: contactId }, true);
  console.log(response);
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while deleting the contact.');
  }
};

module.exports = {
  getAll,
  getSingle,
  createContact,
  updateContact,
  deleteContact
};
