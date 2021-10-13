const router = require('express').Router();

const {authMiddleware} = require('../middlewares');
const {authController} = require('../controllers');
const {userRoles} = require('../constants');

router.post(
    '/',
    authMiddleware.isAuthValid,
    authMiddleware.isEmailExist,
    authMiddleware.isUserRolesChecked([userRoles.USER]),
    authMiddleware.isPasswordMatched,
    authController.login
);

module.exports = router;
