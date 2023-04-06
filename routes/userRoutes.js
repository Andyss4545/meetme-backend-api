const express = require('express');
const { getUser, deleteUser, updateUser, followUser, unfollowUser } = require('../controllers/userController');
const router = express.Router();


// Get user
router.get('/:id', getUser)
// Delete user Route
router.delete('/:id', deleteUser)
// Update user Route
router.put('/:id', updateUser)
// Follow user Route
router.put('/:id/follow', followUser)
// Unfollow user Route
router.put('/:id/unfollow', unfollowUser)


module.exports = router