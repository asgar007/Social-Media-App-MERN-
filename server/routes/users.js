const express = require('express');
//import all controllers needed
const userController = require('../controllers/userController');
const { verifyToken } = require('../middleware/auth');
const router = express.Router();

/* READ */
router.get('/:id', verifyToken, userController.getUser);
router.get('/:id/friends', verifyToken, userController.getUserFriends);
/* UPDATE */
router.patch('/:id/:friendId', verifyToken, userController.addRemoveFriend);

module.exports = router; 