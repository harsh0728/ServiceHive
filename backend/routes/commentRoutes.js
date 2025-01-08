const express = require('express');
const { addComment, getComments } = require('../controllers/commentController');
const authenticateJWT = require('../middleware/authenticateJWT');

const router = express.Router();

router.post('/:id/comments', authenticateJWT, addComment);
router.get('/:id/comments', authenticateJWT, getComments);

module.exports = router;
