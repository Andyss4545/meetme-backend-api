const asyncHandler = require('express-async-handler');
const Comments = require('../models/commentModel')
const posts = require('../models/postModel')
const Users = require('../models/userModel');
const { post } = require('../routes/commentRoute');


// Get comments condition
getAllComments = asyncHandler(async(req, res) => {
    try{
            const post = await posts.findById(req.params.id)

              if(post.comments.length < 1){
                  res.status(404).json('comments not found')
              }
              if(!post){
                   res.status(404).json('Post not found')
              }
              const comment = post.comments
              console.log(comment)
              res.status(200).json({comment})

    }catch(error){
           res.status(500).json(error)
    }
})

// Create comment condition
postComment = asyncHandler(async(req, res) => {
    try{ 
          // find the post id
          const post = await posts.findById(req.params.id)
          // create the comment from the req.body
          const comment = await Comments.create({...req.body, post})
          // console.log(post)
          // console.log(comment)
          // push the comment into the post comments arrays
          post.comments.push(comment)
          // save the comment to the database
          comment.save()
          // save the post to the database
          await post.save()
          res.status(201).json('comment created successfully.')

    }catch(error){
        // internal server error
         res.status(500).json(error)
    }
})

// Update commet condtion
updateComment = asyncHandler(async(req, res) => {
    try{
        // find the comment id and update the req body
         const comment = await Comments.findByIdAndUpdate(
               req.params.id,
               {$set: req.body},
               {new: true}
         )

         // if the comment owner id is equal to the req body id
         if(comment.userId === req.body.userId){
               res.status(201).json({comment})
         }else{
               res.status(401).json('You can only update your comment')
         }
    }catch(error){
         res.status(500).json(error)
    }
})


// Delete comment condition
deleteComment = asyncHandler(async(req, res) => {
    try{
        // find comment by id and delete
         const comment = await Comments.findByIdAndDelete(req.params.id)
         //  if comment is not available
         if(!comment){
              res.status(404).json('comment could not be found')
         }

         // if the comment userId is equal to the re body user then delete the comment
         if(comment.userId === req.body.userId){
               res.status(200).json(comment).json('comment deleted successfully')
              // res.status(200).json('comment deleted successfully')
         }else {
              res.status(401).json('You can only delete your own comment')
         }
    }catch(error){
         res.status(500).json(error)
    }
    res.status(200).json({message: "delete comment"})
})


// like comment condtion
likeComment = asyncHandler(async(req, res) => {
    try{
          // find the comment
          const comment = await Comments.findById(req.params.id)
          // if the comment likes does not inclide the new user then update one
          if(!comment.like.includes(req.body.userId)){
             await post.updateOne({$push: {likes: req.body.userId}})
              res.status(200).json('comment has been liked')
          } else {
              await comment.updateOne({$pull: {likes: req.body.userId}})
              res.status(200).json('comment has been unliked')
          }
    }catch(error){
          res.status(500).json(error)
    }
    
})


module.exports = {
      getAllComments,
      postComment,
      updateComment,
      deleteComment,
      likeComment
}