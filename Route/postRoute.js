const express = require('express')
const postController = require('../controller/postsController')
const commentController = require('../controller/commentController')
const auth = require('../MiddleWare/authControler')
const utils = require('../config/utils')
const Router = express.Router();
Router.use(express.urlencoded({extended:true}))
Router.use(express.json())

const upload = utils.uploads


Router.post('/new',auth,upload.array('images',4),postController.addPost)
Router.get('/allpost',postController.getAllPost)
Router.get('/userposts', auth, postController.getUserPosts)
Router.get('/stack',postController.getStackPosts)
Router.get('/:id',auth,postController.singlePost)
Router.get('/updatelike/:id',auth,postController.updateLikes)
Router.delete('/:id',auth,postController.deletePost)
Router.post('/:id',auth,commentController.MakeAcomment)
Router.get('/allcomment/:id', auth, commentController.viewCommentByPost)










module.exports = Router