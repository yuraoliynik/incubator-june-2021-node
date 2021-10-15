const router = require('express').Router();

const {authValidator} = require('../validators');
const {validMiddleware, authMiddleware} = require('../middlewares');
const {authController} = require('../controllers');
const {userRoles} = require('../constants');

router.post(
    '/',
    validMiddleware.isBodyValid(authValidator, 1),
    authMiddleware.isEmailExist,
    authMiddleware.isUserRolesChecked([
        userRoles.USER,
        userRoles.ADMIN,
        userRoles.MANAGER
    ]),
    authMiddleware.isPasswordMatched,
    authController.login
);

module.exports = router;
