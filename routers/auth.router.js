const router = require('express').Router();

const {authValidator, logoutValidator} = require('../validators');
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
    '/refresh',
    authMiddleware.checkRefreshToken,
    authController.refresh
);

router.post(
    '/logout',
    validMiddleware.isBodyValid(logoutValidator),
    authMiddleware.checkRefreshToken,
    authController.logout
);


module.exports = router;
