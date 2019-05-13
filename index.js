const express = require('express')
const mongoose = require('./config/database')
const { userRouter } = require('./app/controllers/userController')

const port = 3005
const app = express()
app.use(express.json())

app.use('/users' , userRouter )

app.listen(port , function(){
    console.log('Listening to the port',port)
})