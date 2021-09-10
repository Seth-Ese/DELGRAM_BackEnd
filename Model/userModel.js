const mongoose = require('mongoose')


const userSchema = mongoose.Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName: { 
        type: String,
         required: true 
        },
    userName:{
        type:String,
        required:true},
    email:{type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    phoneNumber:{
        type:String,
        required:true
    },
    profilePicture:{
        type:String,
        required:false
    },
    stack:{
        type:String,
        required:true
    },
    yearOfGraduation:{
        type:String,
        required:false
    },
    website:{
        type:String,
        required:false
    },
    fieldOfWork:{
        type:String,
        required:false
    },
    bio:{
        type:String,
        required:false
    },
    dateOfbirth:{
        type:String,
        required:false,
        trim:true
    },
    location:{
        type:String,
        required:false
    },
    gender:{type:String,
        required:false
    },
    isOnline:{type:Boolean,
        default:false,
        required:true
    },
    dateCreated:{type:Date,
        default:Date.now()
    }
})

//creating user model

const users = mongoose.model('Users',userSchema)

module.exports = users