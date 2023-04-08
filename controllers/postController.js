const asyncHandler = require('express-async-handler');
const posts = require('../models/postModel')
const Users = require('../models/userModel')

// Condition to create your post
const createPost = asyncHandler(async(req, res) => {
      try{
           // create post from the request body
            const post = await posts.create(req.body)
            res.status(201).json({post})
            res.status(201).json('Post created successfully.')
      }catch(error){
           console.log(error)
      }
}) 

// condition to get your posts
const getPost = asyncHandler(async(req, res) => {
    try{
        // find the post by the id
        const post = await posts.findById(req.params.id)
        // if there is no post
        if (!post) {
            return res.status(404).json('Post not found');
        }
        // if the post id is the same as the request userId then get post
        if(req.body.userId === post.userId){
           return  res.status(201).json({post})
        } else{
            // error! unauthorize access
             res.status(401).json('You can only view your post')
        }
    }catch(error) {
         console.log(error)
    }
}) 

// Condition to update post
const updatePost = asyncHandler(async(req, res) => {
    // find the id and update
     const post = await posts.findByIdAndUpdate(
         req.params.id,
         {$set: req.body},
         {new: true}
     )
    // const post = await posts.findByIdA(req.params.id)
    try{

        // if post not found
        if (!post) {
            return res.status(404).json('Post not found');
        }
         // if the post userId is equal to the body id update post
        if(post.userId === req.body.userId){
              res.status(201).json({post})
           res.status(200).json('This post has been updated')
        } else {
            res.status(403).json('You can only update your own post')
        }
    }catch(error){
         console.log(error)
    }
}) 

// Condition to delete  post
const deletePost = asyncHandler(async(req, res) => {
    try{
        // find by id and delete post
         const post = await posts.findByIdAndDelete(req.params.id)
         if(post.userId === req.body.userId){
              res.status(200).json({post}).
              res.status(201).json('post has been deleted')
         }else{
            // unauthorized action
              res.status(403).json('You can only delete your post')
         }

    }catch(error){
         res.status(500).json('Internal server error')
    }

}) 

const getTimelinePosts = asyncHandler(async(req, res) => {
    try{
        // find the current user id
         const currentUser = await Users.findById(req.params.id)
         // find the userpPosts with currentUser Id
         const userPosts = await posts.find({userId: currentUser._id})
         // look for the friendPosts and map it to show or find all it's post
         const friendPosts = await Promise.all(
              currentUser.followings.map((friendId) => {
                  return posts.find({userId: friendId})
              })
         )
         res.status(200).json(userPosts.concat(...friendPosts))
    }catch(error){
         res.status(500).json(error)
    }
}) 

// Condition for liking and unliking posts
const likePost = asyncHandler(async(req, res) => {
    try{
        // find the post by it's id
          const post = await posts.findById(req.params.id)
          // if post likes does not includes req.body.userId
          if(!post.likes.includes(req.body.userId)){
            // push the user to the post
              await post.updateOne({$push: {likes: req.body.userId}})
              res.status(200).json('Post has been liked')
          } else{
            // pull or remove the request body user from the post
            await post.updateOne({$pull: {likes: req.body.userId}})
            res.status(200).json('Post has been unliked')
          }
    }catch(error){
          res.status(500).json(error)
    }
}) 


module.exports = {
      createPost,
      getPost,
      updatePost,
      deletePost,
      getTimelinePosts,
      likePost
}