const router = require('express').Router();

const userMiddleware = require('../middlewares/user.middleware');
const userController = require('../controllers/user.controller');

router.get('/', userController.getUsers);
router.post('/', userMiddleware.createUser, userController.createUser);

router.get('/:userId', userMiddleware.userExist, userController.getUserById);
router.put('/:userId', userMiddleware.userExist, userController.updateUser);
router.delete('/:userId', userMiddleware.userExist, userController.deleteUser);

module.exports = router;
