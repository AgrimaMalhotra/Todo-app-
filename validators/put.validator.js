const joi = require('joi');
const putSchema = () => joi.object({
    id: joi.number().required(),
    task: joi.string().required(),
    isCompleted: joi.boolean().required()
});

module.exports = { putSchema };