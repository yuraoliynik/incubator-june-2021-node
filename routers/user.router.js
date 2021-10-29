const router = require('express').Router();

const {
    queryGetAllUserValidator,
    userValidator,
    userPutValidator
} = require('../validators');
const {
    authMiddleware,
    fileMiddleware,
    roleMiddleware,
    validMiddleware,
    userMiddleware
} = require('../middlewares');
const {userRoles} = require('../constants');
const {userController} = require('../controllers');

router.get(
    '/',
    validMiddleware.isQueryValid(queryGetAllUserValidator),
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

router.post(
    '/:userId/avatar',
    fileMiddleware.checkUserAvatar,
    userMiddleware.isUserExist,
    authMiddleware.isUserActivated,
    userMiddleware.uploadUserAvatar,
    userController.updateUser
);
router.put(
    '/:userId/avatar',
    fileMiddleware.checkUserAvatar,
    authMiddleware.checkAccessToken,
    userMiddleware.isUserExist,
    userMiddleware.uploadUserAvatar,
    userController.updateUser
);


module.exports = router;
