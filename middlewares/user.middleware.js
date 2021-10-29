const {
    errorMessages,
    errorStatuses,
    itemTypes
} = require('../constants');
const {User} = require('../models');
const {s3Service} = require('../services');

module.exports = {
    isUserExist: async (req, res, next) => {
        try {
            const {params: {userId}} = req;

            const foundUser = await User.findById(userId);

            if (!foundUser) {
                return next({
                    message: errorMessages.USER_ID_DOESNT_EXIST,
                    status: errorStatuses.code_404
                });
            }

            req.foundUser = foundUser;

            next();
        } catch (err) {
            next(err);
        }
    },

    isUserEmailExist: async (req, res, next) => {
        try {
            const {body: {email}} = req;

            const userEmail = await User.findOne({email});

            if (userEmail) {
                return next({
                    message: errorMessages.USER_EMAIL_ALREADY_EXISTS,
                    status: errorStatuses.code_409
                });
            }

            next();
        } catch (err) {
            next(err);
        }
    },

    uploadUserAvatar: async (req, res, next) => {
        try {
            const {
                files: {avatar},
                foundUser: {_id}
            } = req;

            const uploadInfo = await s3Service.uploadImage(
                avatar,
                itemTypes.USERS,
                _id.toString()
            );

            req.body = {avatar: uploadInfo.Location};

            next();
        } catch (err) {
            next(err);
        }
    }
};
