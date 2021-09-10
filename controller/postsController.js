const { response } = require('express')
const Users = require('../Model/userModel')
const posts = require('../Model/postModel')
const auth = require('../MiddleWare/authControler')
const cloudinary = require('../cloudinary')
const fs = require('fs-extra')


//1. create post
exports.addPost = async (req, res) => {
    const body = req.body


    let imageArray = [];


    const imagePromises = req.files.map(file => {

        let imageUpload = cloudinary.uploader.upload(file.path, { folder: "uploads" })

        // Deleting the local image after uploading to Cloudinary
        fs.unlink(file.path, err => {
            if (err) console.log(err)
        })

        return imageUpload
    })

    const result = await Promise.all(imagePromises)
    result.forEach(image => {
        imageArray.push(image.secure_url)
    })

    console.log(body)
    let userid = req.user._id
    const stack = req.user.stack
    let Posts = {title} = body
    Posts.stack = stack
    Posts.userid = userid
    console.log(req.files)
    // for(file of req.files){
    //     images.push(file.filename)
    // }
    console.log(imageArray)

    posts.dateCreated = new Date()

    let postresponse
    try {

        postresponse = await posts.create({ ...Posts, Image_url: imageArray })
        res.json(postresponse)

    } catch (error) {
        console.log(error)

    }


}



//1.get all posts
exports.getAllPost = async (req, res) => {

    try {
        const post = await posts.find().populate({
            path: 'userid',
            select: 'profilePicture userName location -_id'
        }).sort({ createdAt: "asc" });
        res.status(200).json({
            status: 'success',
            data: reverseArray(post)
        })

    } catch (error) {
        console.log(error)


    }

  


}

const reverseArray = (arr)=>{
    let newArray=[]
    for(i=arr.length-1;i>=0;i--){
        newArray.push(arr[i])
    }
    return newArray
}

//get posts made by a particular user
exports.getUserPosts = async (req, res) => {
    const userid = req.user._id
    try {
        const userposts = await posts.find({ userid }).populate({
            path: 'userid',
            select: 'profilePicture userName -_id'
        }).sort({ createdAt: "asc" });
        // console.log(userposts)
        res.status(200).json({
            status: 'success',
            data: reverseArray(userposts)
        })

    } catch (error) {
        console.log(error)  
    }
}
//2.get post by stack
exports.getStackPosts = async (req, res) => {
    const { stack } = req.body
    try {
        let stackPost = await posts.find({ stack }).populate({
            path:'userid',
            select:'userName profilePicture location -_id'
        }).sort({ createdAt: "asc"})
        res.status(200).json({
            status: 'Successfull',
            data: reverseArray(stackPost)
        })

    } catch (error) {
        console.log(error)
    }
}
//3.getpost by id

exports.singlePost = async (req, res) => {

    const userid = req.user._id
    const id = req.params.id
    //console.log(id)
    try {
        const post = await posts.findById(id)
        res.status(200).json({

            data: post
        })
    } catch (error) {

    }
}




// 4.For updating Likes
exports.updateLikes = async (req, res) => {
    const postId = req.params.id
    const user = req.user
    try {
        let currentPost = await posts.findById(postId)
        // Increament the likes
        currentPost.noOflikes = Number(currentPost.noOflikes) + 1
        // Get the last user that liked the post
        currentPost.lastLiked = user.userName;
        let response = await currentPost.save()
        res.status(200).json({
            data: response
        })
    }
    catch (error) {
        console.log(error)
    }

}

//5.deleting  a post

exports.deletePost = async (req, res) => {
    const postId = req.params.id
    let userid = req.user
    let del = req.body;
    try {
        const deletepost = await posts.findOneAndDelete({ userid, _id: postId })
        if (deletepost) {
            res.status(200).json({
                message: 'post successfully deleted'
            })
        }
        else {
            res.status(401).json({
                message: 'not authorized to delete this post'
            })
        }
    } catch (error) {
        console.log(error)

    }
}


