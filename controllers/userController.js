const Users = require('../models/userModel');
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')



const registerUser = asyncHandler(async(req, res) => {
    
    try{
        // destructure input fields
        const {firstname, lastname, email, password } = req.body
        // hashpassword so as not to save real password to database
        const hashedPassword = await bcrypt.hash(password, 10)
        // create the user
        const user = await Users.create({
              firstname: firstname,
              lastname: lastname,
              email: email,
              password: hashedPassword
        })
         // return created user
         res.status(201).json(user)
    }catch(error){
         console.log(error)
    }
    
}) 


const loginUser = asyncHandler(async(req, res) => {
    try{
        // destructured email ad password
         const {email, password} = req.body
          if(!email || !password){
               res.status(404) // user not found
               throw new Error('This user cannot be found')
          } 
         
         // find user by email
         const user = await Users.findOne({email})
         // compare the typed password and the on stored on the database
         const validPassword  = await bcrypt.compare(password, user.password)

         // if there is no valid password
         if(!validPassword){
             res.status(401) // Not authorized
             throw new Error('Password is not valid')
         }
         res.status(201).json(user)
    }catch(error){
         console.log(error)
    }
}) 

// get the user
const getUser = asyncHandler(async(req, res) => {
    try{
        // find the user by id
        const user = await Users.findById(req.params.id)
        res.status(201).json({user})
    }catch(error){
         console.log(error)
    }
    
}) 

// update the user
const updateUser = asyncHandler(async(req, res) => {
    // if the userId is the same with the user Id and it's not admin
    if(req.body.userId === req.params.id || req.body.isAdmin){

        if(req.body.password){
            try{
                // update the password with new hash password
                req.body.password = await bcrypt.hash(req.body.password, 10)
            }catch(error){
                return res.status(500).json(error)
            }
        }

        try{
            //find the user and update
            const user = await Users.findByIdAndUpdate(
                 req.params.id,
                 {$set: req.body},
                 {new: true}
            )
            res.status(201).json({user})
   
       }catch(error){
             console.log(error)
       }

       }else {
            res.status(403) //unauthorized
            throw new Error('You can only update your own account')
       }
    
    
}) 

// delete user
const deleteUser = asyncHandler(async(req, res) => {

    if(req.body.userId === req.params.id || req.body.isAdmin){
        try{
            // find the user by id
              const user = await Users.findByIdAndDelete(req.params.id)

              res.status(201).json({user})
              res.status(200).json({message: "User deleted successfully"})
        }catch(error){
             console.log(error)
        }
    } else{
           res.status(403) // unauthorized
           throw new Error('You can only delete your own account')
    }
    
}) 

// follow user
const followUser = asyncHandler(async(req, res) => {
    if(req.body.userId !== req.params.id){
        try{
            // find the user 
            const user = await Users.findById(req.params.id)
            // this is the current user that wants to follow
            const currentUser = await Users.findById(req.body.userId)

            // if the user has not follow the current user
            if(!user.followers.includes(req.body.userId)){
                // update the user followers 
                  await user.updateOne({$push: {followers: req.body.userId}})
                // update the current user followings
                  await currentUser.updateOne({$push: {followings: req.params.id}})
                  res.status(201).json('User has been followed')
            } else{
                 res.status(403).json('You already follow this user')
            }
        }catch(error){
             console.log(error)
        }
         

    }else {
         res.status(403).json(`You can't follow yourself`)
    }
}) 

// unfollow user
const unfollowUser = asyncHandler(async(req, res) => {
    if(req.body.userId !== req.params.id){
        try{
            // find the user 
            const user = await Users.findById(req.params.id)
            // this is the current user that wants to follow
            const currentUser = await Users.findById(req.body.userId)

            // if the user has not follow the current user
            if(user.followers.includes(req.body.userId)){
                // update the user followers 
                  await user.updateOne({$pull: {followers: req.body.userId}})
                // update the current user followings
                  await currentUser.updateOne({$pull: {followings: req.body.id}})
                  res.status(201).json('User has been unfollowed')
            }else {
                  res.status(403).json('You already unfollowed this user')
            }
        }catch(error){
             console.log(error)
        }
         

    }else {
         res.status(403).json(`You can't follow yourself`)
    }
}) 



module.exports = {
      registerUser,
      loginUser,
      getUser,
      updateUser,
      deleteUser,
      followUser,
      unfollowUser
}