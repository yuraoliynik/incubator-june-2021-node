const {
    errorMessages,
    errorStatuses,
    maxSizes,
    mimeTypes
} = require('../constants');
const {} = require('../errors/ErrorHandler');

module.exports = {
    checkUserAvatar: (req, res, next) => {
        try {
            const {avatar} = req.files || {};

            if (!avatar) {
                return next({
                    message: errorMessages.NO_AVATAR,
                    status: errorStatuses.code_400
                });
            }

            const {size, mimetype} = avatar;

            if (!mimeTypes.PHOTOS.includes(mimetype)) {
                return next({
                    message: errorMessages.NOT_SUPPORTED_FORMAT,
                    status: errorStatuses.code_400
                });
            }

            if (maxSizes.PHOTO < size) {
                return next({
                    message: errorMessages.FILE_IS_TOO_BIG,
                    status: errorStatuses.code_400
                });
            }

            next();
        } catch (err) {
            next(err);
        }
    }
};
