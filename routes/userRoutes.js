const express = require('express');
const { getUser, deleteUser, updateUser, followUser, unfollowUser } = require('../controllers/userController');
const router = express.Router();



router.get('/:id', getUser)
router.delete('/:id', deleteUser)
router.put('/:id', updateUser)
router.put('/follow/:id', followUser)
router.put('/unfollow/:id', unfollowUser)


module.exports = router