const {model, Schema} = require('mongoose');

const authSchema = new Schema({
    token_access: {
        type: String,
        required: true
    },

    token_refresh: {
        type: String,
        required: true
    },

    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {valid: true, versionKey: false});

module.exports = model('OAuth', authSchema);
