const router = require('express').Router();

const {userValidator, userPutValidator} = require('../validators');
const {authMiddleware, roleMiddleware, validMiddleware, userMiddleware} = require('../middlewares');
const {userRoles} = require('../constants');
const {userController} = require('../controllers');

router.get(
    '/',
    userController.getUsers
);
router.post(
    '/',
    validMiddleware.isBodyValid(userValidator),
    userMiddleware.isUserEmailExist,
    userController.createUser
);

router.get(
    '/:userId',
    userMiddleware.isUserExist,
    userController.getUserById
);
router.put(
    '/:userId',
    validMiddleware.isBodyValid(userPutValidator),
    authMiddleware.checkAccessToken,
    userMiddleware.isUserExist,
    userController.updateUser
);
router.delete(
    '/:userId',
    authMiddleware.checkAccessToken,
    roleMiddleware.isUserRolesChecked([userRoles.ADMIN]),
    userController.deleteUser
);

module.exports = router;
