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
    authMiddleware.access
);

router.post(
    '/refresh',
    validMiddleware.isBodyValid(refreshValidator),
    authMiddleware.access,
    authController.login
);

router.post(
    '/logout',
    validMiddleware.isBodyValid(refreshValidator),
    authMiddleware.access,
    authController.logout
);


module.exports = router;
