const joi = require('joi');
const idSchema = () => {
    return joi.number();
}


module.exports = { idSchema };