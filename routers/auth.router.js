const router = require('express').Router();

const {authValidator} = require('../validators');
const {authMiddleware, validMiddleware} = require('../middlewares');
const {authController} = require('../controllers');

router.post(
    '/',
    validMiddleware.isBodyValid(authValidator, 1),
    authMiddleware.isEmailExist,
    authMiddleware.isPasswordMatched,
    authController.login
);

module.exports = router;
