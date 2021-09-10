
exports.checkDetails = (req,res,next)=>{
    const body = req.body
    console.log(body)
    if(!body.firstName||!body.lastName||!body.email||!body.stack||!body.password||!body.userName||!body.phoneNumber){
        res.status(400).json({
            message:'Please Enter the required  Details'
        })
    }
    next()
}

