const express = require('express');
const {updateComment, deleteComment, postComment, likeComment, getAllComments } = require('../controllers/commentController');
const router = express.Router();

// Post comment
router.post('/:id', postComment);
// Edit comment
router.put('/:id', updateComment);
// Get all comment
router.get('/:id/comments', getAllComments);
// Delete comment
router.delete('/:id', deleteComment);
// Like comment
router.put('/:id/like', likeComment);


module.exports = router