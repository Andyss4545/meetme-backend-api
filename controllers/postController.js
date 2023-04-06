const asyncHandler = require('express-async-handler');
const posts = require('../models/postModel')

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

const updatePost = asyncHandler(async(req, res) => {
     const post = await posts.findByIdAndUpdate(
         req.params.id,
         {$set: req.body},
         {new: true}
     )
    // const post = await posts.findByIdA(req.params.id)
    try{

        if (!post) {
            return res.status(404).json('Post not found');
        }

        if(post.userId.toString === req.body.userId){
              res.status(201).json({post})
           res.status(200).json('This post has been updated')
        } else {
            res.status(200).json('You can only update your own post')
        }
    }catch(error){
         console.log(error)
    }
}) 

const deletePost = asyncHandler(async(req, res) => {
    res.status(201).json('Post deleted')
}) 

const getTimelinePosts = asyncHandler(async(req, res) => {
    res.status(201).json('Get all timeline posts')
}) 

const likePost = asyncHandler(async(req, res) => {
    res.status(201).json('Post liked')
}) 


module.exports = {
      createPost,
      getPost,
      updatePost,
      deletePost,
      getTimelinePosts,
      likePost
}