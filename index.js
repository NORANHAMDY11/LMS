const express = require('express')
const mongoose = require('mongoose')
const courseRoutre = require('./routes/courseRoutes')
require('dotenv').config()
const path = require('path')
const httpStatusText= require('./utils/httpStatusText')
const port = process.env.PORT
const url = process.env.MONGO_URL
const app= express()

app.use(express.json())
app.use ('/uploads', express.static(path.join(__dirname , 'uploads')))

const cors = require('cors')
const userRouter = require ('./routes/userRoutes')

mongoose.connect(url)
db= mongoose.connection
db.once('open',()=>{
    
    console.log('Connected to DB')
})
app.use(courseRoutre)
app.use('/api/users',userRouter)
app.all('*',(req,res,next)=>{
    return res.status(404).json({ status : httpStatusText.ERROR , message : 'This page not found'})
})
app.use(cors())
 app.listen(port,()=>{
    console.log('Apllication Running Sussessfuly ')
 })

 