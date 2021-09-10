const express = require('express')
const multer = require('multer');
require('dotenv').config()
const cors = require('cors')
const app = express();
const dbConnect = require('./config/db');
const userRouter = require('./Route/userRoute')
const postRouter = require('./Route/postRoute');

app.use(express.urlencoded({ extended: true }))
app.use(cors({ origin: "*" }))

dbConnect()

app.use(express.static('uploads'))

app.use('/api/users',userRouter)
app.use('/api/post',postRouter)



app.all('*',(req,res)=>{
        res.status(200).json({message:'welcome to our API'})
})







const PORT = process.env.PORT
app.listen(PORT,()=>{
    console.log(`Server is working at port...${PORT}`)
})
