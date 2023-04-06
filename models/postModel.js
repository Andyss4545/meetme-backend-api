const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
       userId: {
          type: String,
          //type: mongoose.Schema.Types.String,
          require: true,
          ref: 'post'
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
      }

},{timestamps: true})


module.exports = mongoose.model('posts', postSchema)