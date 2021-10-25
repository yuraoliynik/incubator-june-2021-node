const {model, Schema} = require('mongoose');

const {modelNames} = require('../constants');

const actionTokenSchema = new Schema({
    token: {
        type: String,
        required: true
    },

    type: {
        type: String,
        required: true
    },

    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: modelNames.USER
    }
}, {
    id: false,
    timestamps: true,
    versionKey: false,
    toObject: {virtuals: true},
    toJSON: {virtuals: true}
});

actionTokenSchema.pre('findOne', function() {
    this.populate({path: 'user', options: {lean: true}}).lean();
});

actionTokenSchema.pre('deleteOne', function() {
    this.lean();
});

actionTokenSchema.pre('deleteMany', function() {
    this.lean();
});

module.exports = model(modelNames.ACTION_TOKEN, actionTokenSchema);
