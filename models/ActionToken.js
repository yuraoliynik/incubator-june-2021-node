const {model, Schema} = require('mongoose');

const {modelNames} = require('../constants');

const actionTokenSchema = new Schema({
    token_action: {
        type: String,
        required: true
    },

    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: modelNames.USER
    }
}, {timestamps: true, versionKey: false});

module.exports = model(modelNames.ACTION_TOKEN, actionTokenSchema);
