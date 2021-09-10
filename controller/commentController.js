const Comment = require('../Model/commentModel')
const posts = require('../Model/postModel')


exports.MakeAcomment = async (req,res)=>{
    let body = req.body 
    let user = req.user
    let userid = user._id
    let postid = req.params.id
    let comments = {commentText} = body
    comments.user_id = userid
    comments.post_id = postid

        let newComment
    try {
         newComment = await Comment.create({...comments})
         res.json(newComment)
    } catch (error) {
        console.log(error)
    }
}


// getting all comments

const reverseArray = (arr) => {
    let newArray = []
    for (i = arr.length - 1; i >= 0; i--) {
        newArray.push(arr[i])
    }
    return newArray
}

exports.viewCommentByPost = async(req,res)=>{
    const post_id = req.params.id
    console.log(post_id)
    try{
        const comments = await Comment.find({post_id}).populate({
            path:'user_id',
            select:'profilePicture userName'
        }).sort({ createdAt: "asc"})
        res.status(200).json({
            data:comments
        })
    }
    catch(e){
        console.log(e)
    }
}


