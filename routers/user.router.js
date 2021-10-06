const router = require('express').Router();

const userController = require('../controllers/user.controller');


router.get('/', userController.getUsers);
router.get('/:userId', userController.getUserById);

router.post('/', userController.createUser);

router.put('/:userId', userController.updateUser);

router.delete('/:userId', userController.deleteUser);


module.exports = router;