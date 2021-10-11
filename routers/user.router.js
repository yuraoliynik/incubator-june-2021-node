const router = require('express').Router();

const userMiddleware = require('../middlewares/user.middleware');
const userController = require('../controllers/user.controller');

router.get(
    '/',
    userController.getUsers
);
router.post(
    '/',
    userMiddleware.isUserValid,
    userMiddleware.createUser,
    userController.createUser
);

router.get(
    '/:userId',
    userMiddleware.isUserExist,
    userController.getUserById
);
router.put(
    '/:userId',
    // userMiddleware.isUserValid,
    userMiddleware.isUserExist,
    userController.updateUser
);
router.delete(
    '/:userId',
    userMiddleware.isUserExist,
    userController.deleteUser
);

module.exports = router;
