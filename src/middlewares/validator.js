const HTTPErrors = require('../utils/httpError');
const validators = require('../../validators/index');

const validatorMap = { 'id': validators.idSchema, 'post': validators.postSchema, 'put': validators.putSchema, 'patch': validators.patchSchema, 'token': validators.tokenSchema };
const validTest = (validator) => {
  if (!validator in validators) {
    throw new HTTPErrors('Validator not found', 500);
  }
  if (validator === 'id') {
    return (req, res, next) => {
      const schema = validatorMap[validator]();
      const { error, value } = schema.validate(req.params.id);
      if (!error) {
        next();
      }
      else {
        if (error.isJoi) {
          throw new HTTPErrors(error.message, 422); //unprocessible services
        } else {
          throw new HTTPErrors(error.message, 500);
        }
      };
    }
  }
  else if (validator === 'token') {
    return (req, res, next) => {
      const schema = validatorMap[validator]();
      const { error, value } = schema.validate(req.headers.token);
      if (!error) {
        next();
      }
      else {
        if (error.isJoi) {
          throw new HTTPErrors(error.message, 422); //unprocessible services
        } else {
          throw new HTTPErrors(error.message, 500);
        }
      };
    }
  }
  else {
    return (req, res, next) => {
      const schema = validatorMap[validator]();
      const { error, value } = schema.validate(req.body);
      if (!error) {
        next();
      }
      else {
        if (error.isJoi) {
          throw new HTTPErrors(error.message, 422); //unprocessible services
        } else {
          throw new HTTPErrors(error.message, 500);
        }
      };
    }
  }
}
module.exports = { validTest };