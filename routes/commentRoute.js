const express = require('express');
const { getComment, updateComment, deleteComment, postComment, likeComment } = require('../controllers/commentController');
const router = express.Router();

// post comment
router.post('/', postComment);
// Edit comment
router.put('/:id', updateComment);
// get comment
router.get('/:id', getComment);
// delete comment
router.delete('/:id', deleteComment);
// like comment
router.put('/:id/like', likeComment);


module.exports = router