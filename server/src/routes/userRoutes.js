const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const verifyToken = require('../middlewares/authMiddleware');

router.post('/signup', userController.signup);

router.get('/:userid', verifyToken, userController.getUserInfo);

module.exports = router;