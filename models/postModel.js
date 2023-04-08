const mongoose = require('mongoose');

// Here is the post schema or model
const postSchema = new mongoose.Schema({
       userId: {
          type: String,
          require: true,
       },

      desc:{
          type: String,
      },

      image: {
          type : String
      },

      video: {
           type: String
      },

      likes: {
          type : Array,
          default: []
      },

      // comments are in array
      comments:[
        {
           type: String,
           ref: 'comment'
        }
      ]

},{timestamps: true})


module.exports = mongoose.model('posts', postSchema)