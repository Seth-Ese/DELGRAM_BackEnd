
const express = require('express')
const auth = require('../controller/userController')
const middleWare = require('../MiddleWare/middleware')
const header = require('../MiddleWare/authControler')
const utils = require('../config/utils')

 const profile = utils.uploads

const Router = express.Router()

Router.use(express.urlencoded({extended:true}))
Router.use(express.json())

Router.post('/signup',middleWare.checkDetails,auth.signup)
Router.post('/login', auth.login)
Router.get('/:id',header,auth.singleUser)
Router.put('/:id',header,auth.updateProfile)
Router.post('/:id', header, profile.single('image'), auth.uploadPhoto)
Router.get('/', header, auth.searchUsers)






module.exports = Router

