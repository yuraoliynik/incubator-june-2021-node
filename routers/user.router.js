const router = require('express').Router();

const userMiddleware = require('../middlewares/user.middleware');
const userController = require('../controllers/user.controller');

router.get('/', userMiddleware.getUsers, userController.getUsers);
router.post('/', userMiddleware.createUser, userController.createUser);

router.get('/:userId', userMiddleware.userExists, userController.getUserById);
router.put('/:userId', userMiddleware.userExists, userController.updateUser);
router.delete('/:userId', userMiddleware.userExists, userController.deleteUser);

module.exports = router;
