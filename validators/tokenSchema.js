const joi = require('joi');
const tokenSchema = () => {
    return joi.string();
}

module.exports = { tokenSchema };