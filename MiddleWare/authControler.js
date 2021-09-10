const jwt = require('jsonwebtoken')
const User = require('../Model/userModel')

const authentic = async(req,res,next)=>{
    let token = req.headers.authorization;

    try {
        const authUserId = jwt.verify(token,process.env.SECRET)
        let user = await User.findById(authUserId)
        req.user =user
        
        
    } catch (error) {
        console.error(error)
        res.status(406).json({
            status:'failed',
            message:'please login'
        })
    }
    next();
}

module.exports = authentic;