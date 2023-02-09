const joi = require('joi');
const postSchema = () => joi.object({
    task: joi.string()
        .required()
});

module.exports = { postSchema };