const router = require('express').Router();

const {userValidator, userPutValidator} = require('../validators');
const {
    authMiddleware,
    roleMiddleware,
    validMiddleware,
    userMiddleware
} = require('../middlewares');
const {userRoles} = require('../constants');
const {userController} = require('../controllers');

router.get(
    '/',
    authMiddleware.checkAccessToken,
    roleMiddleware.isUserRolesChecked([
        userRoles.ADMIN,
        userRoles.MANAGER
    ]),
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
router.delete(
    '/:userId',
    authMiddleware.checkAccessToken,
    roleMiddleware.isUserRolesChecked([userRoles.ADMIN]),
    userController.deleteUser
);
router.put(
    '/:userId',
    validMiddleware.isBodyValid(userPutValidator),
    authMiddleware.checkAccessToken,
    userMiddleware.isUserExist,
    userController.updateUser
);

module.exports = router;
