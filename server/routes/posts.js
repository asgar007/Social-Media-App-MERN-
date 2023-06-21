const express = require('express');
const postController = require('../controllers/postController');
const { verifyToken } = require('../middleware/auth');

const router = express.Router();
/* READ */
router.get('/', verifyToken, postController.getFeedPosts);
router.get('/:userId/posts', verifyToken, postController.getUserPosts);

/* UPDATE */
router.patch('/:id/like', verifyToken, postController.likePost);

module.exports = router;