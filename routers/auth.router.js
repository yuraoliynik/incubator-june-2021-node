const router = require('express').Router();

const {authValidator, refreshValidator} = require('../validators');
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
    '/access',
    authController.access
);

router.post(
    '/refresh',
    authController.refresh,
    validMiddleware.isBodyValid(refreshValidator),
    authMiddleware.isEmailExist,
    authController.login
);

router.post(
    '/logout',
    authController.refresh,
    validMiddleware.isBodyValid(refreshValidator),
    authMiddleware.isEmailExist,
    authController.logout
);


module.exports = router;
