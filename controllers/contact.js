const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;
const passwordUtil = require('../helpers/passwordComplexityCheck');

//Get all contacts
const getAllContact = async (req, res) => {
  try {
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
  } catch (err) {
    res.status(500).json(err);
  }
};

//GET single contact based on id
const getContact = async (req, res) => {
  //Validation check
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('A valid contact id required to find a contact.');
  }

  try {
    //  #swagger.parameters['id'] = { description: 'Get a specfic contact' }
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
  } catch (err) {
    res.status(500).json(err);
  }
};

//POST contact
const createContact = async (req, res) => {
  try {
    //Data to add
    const contact = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      phone: req.body.phone,
      role: req.body.role,
      username: req.body.username,
      password: req.body.password
    };

    //Operation
    const result = await mongodb.getDb().db().collection('contact').insertOne(contact);

    //Response
    if (result.acknowledged) {
      res.status(201).json(result);
    } else {
      res.status(500).json(result.error || 'Some error occurred while creating the contact.');
    }

    //Console confirmation
    console.log(`${result.modifiedCount} document(s) created.`);
  } catch (err) {
    res.status(500).json(err);
  }
};

//PUT contact
const updateContact = async (req, res) => {
  //Validation check
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('A valid contact id required to find a contact.');
  }

  if (!req.body.username || !req.body.password) {
    res.status(400).send({ message: 'Username and Password can not be empty.' });
    return;
  }
  const password = req.body.password;
  const passwordCheck = passwordUtil.passwordPass(password);
  if (passwordCheck.error) {
    res.status(400).send({ message: passwordCheck.error });
    return;
  }

  try {
    //ID for update
    const contactId = new ObjectId(req.params.id);
    //Data to update
    const contact = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      phone: req.body.phone,
      role: req.body.role,
      username: req.body.username,
      password: req.body.password
    };

    //Operation
    const result = await mongodb
      .getDb()
      .db()
      .collection('contact')
      .replaceOne({ _id: contactId }, contact);

    //Response
    if (result.acknowledged) {
      res.status(201).json(result);
    } else {
      res.status(500).json(result.error || 'Some error occurred while creating the contact.');
    }
    //console confirmation
    console.log(`${result.modifiedCount} document(s) created.`);
  } catch (err) {
    res.status(500).json(err);
  }
};

//DELETE contact
const deleteContact = async (req, res) => {
  //Validation checking
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('A valid contact id required to find a contact.');
  }

  try {
    //ID for delete
    const contactId = new ObjectId(req.params.id);

    //Operation
    const result = await mongodb.getDb().db().collection('contact').deleteOne({ _id: contactId });

    //Response
    if (result.deletedCount > 0) {
      res.status(200).send();
    } else {
      res.status(500).json(result.error || 'Some error occurred while deleting the contact.');
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  getAllContact,
  getContact,
  createContact,
  updateContact,
  deleteContact 
};
