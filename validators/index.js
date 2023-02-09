const { idSchema } = require('./id.validator');
const { postSchema } = require('./post.validator');
const { putSchema } = require('./put.validator');
const { patchSchema } = require('./patch.validator');
const { tokenSchema } = require('./tokenSchema');
module.exports = {
    idSchema,
    postSchema,
    putSchema,
    patchSchema,
    tokenSchema
};