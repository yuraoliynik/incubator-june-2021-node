const router = require('express').Router();

const authMiddleware = require('../middlewares/auth.middleware');
const authController = require('../controllers/auth.controller');

router.post('/:email', authMiddleware.login, authController.login);

module.exports = router;