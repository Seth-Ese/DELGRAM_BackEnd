const mongoose = require('mongoose')

const postSchema = mongoose.Schema({
    
    title: { 
        type: String,
        required: true },
    Image_url: { 
        type: Array,
        required: false
         },
    stack: {
         type: String,
         required: true
         },
    noOflikes: { 
        type: Number, 
        required: false, 
        default: 0 
    },
    lastLiked: {
         type: String, 
         required: false
         },
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    },
    dateCreated: {
        type: Date,
        // default: new Date()
    }
},

    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },

    }
)
// creating a model
const posts = mongoose.model('Posts', postSchema);

module.exports = posts