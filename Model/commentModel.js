const mongoose = require('mongoose')

const commentSchema = mongoose.Schema({
    commentText:{
        type:String,
        required:true
    },
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Users',
        required:true
    },
    post_id:{
        type:String,
        required:true
    },
    
    dateOfCommet:{
        type:Date,
        default:Date.now()
    }
},
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },

    }
)

const comments = mongoose.model('Comments',commentSchema)

module.exports = comments