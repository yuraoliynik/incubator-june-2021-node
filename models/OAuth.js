const {model, Schema} = require('mongoose');

const {modelNames} = require('../constants');

const oAuthSchema = new Schema({
    accessToken: {
        type: String,
        required: true
    },

    refreshToken: {
        type: String,
        required: true
    },

    user: {
        type: Schema.Types.ObjectId,
        ref: modelNames.USER,
        required: true
    }
}, {
    id: false,
    timestamps: true,
    versionKey: false,
    toObject: {virtuals: true},
    toJSON: {virtuals: true}
});

oAuthSchema.pre('findOne', function() {
    this.populate({path: 'user', options: {lean: true}}).lean();
});

oAuthSchema.pre('deleteOne', function() {
    this.lean();
});

oAuthSchema.pre('deleteMany', function() {
    this.lean();
});

module.exports = model(modelNames.O_AUTH, oAuthSchema);
