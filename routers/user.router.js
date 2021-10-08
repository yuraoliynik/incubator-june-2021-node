const router = require('express').Router();

const userMiddleware = require('../middlewares/user.middleware');
const userController = require('../controllers/user.controller');

router.get('/', userMiddleware.getUsers, userController.getUsers);
router.post('/', userMiddleware.createUser, userController.createUser);

router.get('/:userId', userMiddleware.getUserById, userController.getUserById);
router.put('/:userId', userMiddleware.updateUser, userController.updateUser);
router.delete('/:userId', userMiddleware.deleteUser, userController.deleteUser);

module.exports = router;
