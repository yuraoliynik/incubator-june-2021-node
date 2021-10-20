const router = require('express').Router();

const {authValidator, emailValidator, passwordValidator} = require('../validators');
const {authMiddleware, validMiddleware} = require('../middlewares');
const {authController} = require('../controllers');

router.post(
    '/',
    validMiddleware.isBodyValid(authValidator, 1),
    authMiddleware.isEmailExist,
    authMiddleware.isPasswordMatched,
    authController.login
);

router.post(
    '/logout',
    authMiddleware.checkAccessToken,
    authController.logout
);
router.post(
    '/forgot-password',
    validMiddleware.isBodyValid(emailValidator, 1),
    authMiddleware.isEmailExist,
    authController.forgotPassword
);
router.post(
    '/refresh',
    authMiddleware.checkRefreshToken,
    authController.refresh
);

router.post(
    '/change-password/:token_action',
    validMiddleware.isBodyValid(passwordValidator),
    authMiddleware.checkActionToken,
    authController.changePassword
);

module.exports = router;
