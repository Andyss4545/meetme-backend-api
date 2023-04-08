const mongoose = require('mongoose');


// Here is the comment schema or model
const commentSchema = new mongoose.Schema({
    desc: {
        type: String,
        require: true
    },

    userId: {
        type: String,
        ref: "user",
        require: true
    },

   like: {
        type: Array,
        default: []
   }

},{timestamps: true})


module.exports = mongoose.model('comments', commentSchema)