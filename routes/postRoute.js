const express = require('express')
const { getPost, createPost, updatePost, deletePost, getTimelinePosts, likePost } = require('../controllers/postController')
const router = express.Router()


// Get post
router.get('/:id', getPost)
// Create Post
router.post('/', createPost)
// Update post
router.put('/:id', updatePost)
// Delete post
router.delete('/:id', deletePost)
// All timeline posts
router.get('/timeline/all', getTimelinePosts)
// Like Post
router.put('/:id/like', likePost)

module.exports = router