const Users = require('../Model/userModel')
const utils = require('../config/utils')
const cloudinary = require('../cloudinary')
const fs = require('fs-extra')



// USER'S SIGNUP
exports.signup = async (req, res) => {
    //1. get details from the user
    const body = req.body
    const user = { firstName,lastName, email, stack, password, userName, phoneNumber } = body


    //2.check if email exist

    if (await utils.emailExist(email)) {
        res.status(406).json({
            status: 'Not Acceptable',
            message: 'Email already Exist',
            data: { }
        })


        //3.check if username exist

    }
    else if (await utils.userNameExist(userName)) {
        res.status(406).json({
            status: 'Not Acceptable',
            message: 'Users name already exist',
            data: { }
        })
        //4.check if phone number exist
    }
    else if (await utils.phoneNumberExist(phoneNumber)) {
        res.status(406).json({
            status: 'Not Acceptable',
            message: 'Phone number already exist',
            data: { }
        })
    }
    else {

        //5. encrypt password
        user.password = await utils.encryptPassword(password)
        // 7, save to database
        const userCreated = await Users.create({ ...user })

        res.status(200).json({
            status: 'Success',
            message:'Sign Up Successfull',
            data: userCreated
        })
    }

    

}

// USER'S LOGIN

exports.login = async (req, res) => {
    //1. Get email and password from user
    const { userName, phoneNumber, email, password } = req.body
    let userFound
    if (userName && password) {
        try {
            userFound = await Users.findOne({ userName })
        } catch (error) {
            console.log(error)
        }
    }
    else if (phoneNumber && password) {
        try {
            userFound = await Users.findOne({ phoneNumber })
        } catch (error) {
            console.log(error)
        }
    }
    else if (email && password) {
        try {
            userFound = await Users.findOne({ email })
        } catch (error) {
            console.log(error)
        }
    }
    else {
        res.status(400).json({
            status: 'Failed',
            message: 'Bad Request'
        })
    }
    //2. find user by email,if user exist,verify password,if password is correct

    if (userFound) {
        try {
            const hashedPassword = userFound.password
            if (await utils.verifyPassword(password, hashedPassword)) {
                //3. then generate token for user
                const token = await utils.genToken(userFound._id)
                res.status(200).json({
                    user: userFound,
                    token,
                    message: 'Login Successful'
                })
            }
            else {
                res.status(400).json({
                    message: 'Incorrect Password'
                })
            }
        } catch (error) {
            console.log(error)
        }
    }
    else {
        res.status(404).json({
            message: "User don't exist,please enter correct details"
        })
    }
}




//3. getting single users

exports.singleUser = async(req,res)=>{

    let id = req.params.id
    try {
        const user = await Users.findById(id)
        res.status(200).json({
            data: user
        })
    } catch (error) {
        console.log(error)
    }
}

// searching for users by user names
exports.searchUsers = async (req, res) => {
    const userName = req.query.userName
    console.log(userName)
    try {
        const users = await Users.find({userName})

        res.status(200).json({
            data: users
        })

    } catch (error) {
        console.log(error)
    }
}


//4. updating profile

exports.updateProfile = async(req,res)=>{
    let id = req.params.id
    let userid = req.user._id
    let update = req.body
    
    if(id !=userid){
        res.status(400).json({
            status:'failed',
            message:'wrong user id'
        })

    }
    else{
        try {
            const response = await Users.findByIdAndUpdate(id, { ...update }, { new: true })
            if (response) {
                res.status(200).json({
                    data: response
                })
            }

        } catch (error) {

        }
    }
 
}

//Updating Profile Picture

exports.uploadPhoto = async (req,res)=>{
    let id = req.params.id
    let userid = req.user._id
    let profilePicture
    
    

        await  cloudinary.uploader.upload(req.file.path, { folder: "uploads" },(error,result)=>{
            profilePicture = (result.secure_url)
        })

    //     // Deleting the local image after uploading to Cloudinary
        fs.unlink(req.file.path, err => {
            if (err) console.log(err)
        })



    console.log(profilePicture)
    if(id !=userid ){
        res.status(400).json({
            message:'wrong user'
        })
    }
    else{
        try {
            const updated = await Users.findByIdAndUpdate(id,{ profilePicture},{new:true})
            res.status(200).json({
                message:'successfully updated your picture',
                data:updated
            })
        } catch (error) {
            console.log(error)
        }
    }
}


