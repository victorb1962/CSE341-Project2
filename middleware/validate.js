//get validator
const validator = require('../helpers/validate');

const saveContact = (req, res, next) => {
  const validationRule = {
    firstName: 'required|string',
    lastName: 'required|string',
    email: 'required|email',
    username: 'required|string',
    password: 'required|string',
  };

  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err,
      });
    } else {
      next();
    }
  });
};

const saveArtwork = (req, res, next) => {
  const validationRule = {
    artTitle: 'required|string',
    artYear: 'required|string',
    artPeriod: 'required|string',
    artDesc: 'required|string',
    artType: 'required|string',
    artLocation: 'string',
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err,
      });
    } else {
      next();
    }
  });
};

module.exports = {
  saveContact,
  saveArtwork 
};
