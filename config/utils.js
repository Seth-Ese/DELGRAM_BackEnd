const Users = require('../Model/userModel');
const bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken')
const multer = require('multer');
const path = require('path')


exports.emailExist = async (req,res)=>{
    const foundUser = await Users.findOne({email})
    if(foundUser){
        return true
    }
    else return false;
}

exports.userNameExist = async (req,res)=>{
    const findUsername = await Users.findOne({userName})
    if(findUsername){
        return true
    }
    else return false;
}

exports.phoneNumberExist = async (req,res)=>{
    const userNumber = await Users.findOne({phoneNumber})
    if(userNumber){
        return true
    }
    else return false;
}

exports.encryptPassword = async(password)=>{
    return hashedPassword = await bcrypt.hash(password,12)

}


exports.verifyPassword =async (password,hashedPassword)=>{
   
    return await bcrypt.compare(password,hashedPassword)
}

exports.genToken = async(_id) => {
    return await JWT.sign({_id}, process.env.SECRET,{expiresIn:process.env.JWT_EXPIRES_IN})
    
}

const storage = multer.diskStorage({
    destination:'uploads',
    filename: (req,file,cb)=>{
        const filename = `upload-${Date.now().toString()}${path.extname(file.originalname)}`
        cb(null,filename)
    }
})
exports.uploads = multer({storage})