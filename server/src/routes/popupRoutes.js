const express = require('express');
const router = express.Router();
const popupController = require('../controllers/popupController');
const verifyToken = require('../middlewares/authMiddleware');

router.get('/list', verifyToken, popupController.getActivePopups);

router.get('/listAll', verifyToken, popupController.getAllPopups);

router.post('/enterNew', verifyToken, popupController.createPopup);

module.exports = router;