const router = require('express').Router();

const {authController} = require('../controllers');
const {actionTokenTypes} = require('../constants');
const {authMiddleware, validMiddleware} = require('../middlewares');
const {
    authValidator,
    changePasswordValidator,
    emailValidator,
    forgotPasswordValidator
} = require('../validators');

router.post(
    '/',
    validMiddleware.isBodyValid(authValidator, 1),
    authMiddleware.isEmailExist,
    authMiddleware.isUserActivated,
    authMiddleware.isPasswordMatched(),
    authController.login
);

router.post(
    '/activate-account',
    validMiddleware.isBodyValid(emailValidator, 1),
    authMiddleware.checkActionToken(actionTokenTypes.ACTIVATE_ACCOUNT),
    authController.activateAccount
);
router.put(
    '/change-password',
    validMiddleware.isBodyValid(changePasswordValidator),
    authMiddleware.checkAccessToken,
    authMiddleware.isPasswordMatched(1),
    authController.changePassword
);
router.post(
    '/forgot-password',
    validMiddleware.isBodyValid(emailValidator, 1),
    authMiddleware.isEmailExist,
    authController.forgotPassword
);
router.put(
    '/forgot-password',
    validMiddleware.isBodyValid(forgotPasswordValidator),
    authMiddleware.checkActionToken(actionTokenTypes.FORGOT_PASSWORD),
    authController.changePassword
);
router.post(
    '/logout',
    authMiddleware.checkAccessToken,
    authController.logout
);
router.post(
    '/refresh',
    authMiddleware.checkRefreshToken,
    authController.refresh
);

module.exports = router;
