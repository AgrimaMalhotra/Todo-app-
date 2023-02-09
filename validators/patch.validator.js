const joi = require('joi');
const patchSchema = () => joi.object({
    id: joi.number(),
    task: joi.string(),
    isCompleted: joi.boolean()
});

module.exports = { patchSchema };