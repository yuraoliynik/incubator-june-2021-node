const router = require('express').Router();

const {userValidator, userPutValidator} = require('../validators');
const {validMiddleware, userMiddleware} = require('../middlewares');
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
    userMiddleware.isUserExist,
    userController.updateUser
);
router.delete(
    '/:userId',
    userMiddleware.isUserExist,
    userController.deleteUser
);

module.exports = router;
