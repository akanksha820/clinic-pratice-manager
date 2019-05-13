const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const { User } = require('../models/user')
const { authenticateUser } = require('../middlewares/authenticateUser')


router.post('/register' , function(req,res){
     const body = req.body
     const user = new User(body)
    User.countDocuments({},function(err, count){
        if(count == 0){
          
            user.role = "admin"
        }
    })
    user.save()
        .then(function(user){
            res.send(user)
        })
        .catch(function(err){
            res.send(err)
        })
})


router.post('/login' , function(req,res) {
    const body = req.body
    User.findByCredentials(body.email , body.password)
        .then(function(user) {
           return user.generateToken()  
        })
        .then(function(token){
            res.send({token})
        }) 
        .catch(function(err) {
            res.send(err)
        })
   
})


router.get('/' , function(req,res){
    User.find()
        .then(function(user){
            res.send(user)
        })
        .catch(function(err){
            res.send(err)
        })
})



router.get('/account' , authenticateUser ,function(req,res){
    const { user } = req
    res.send(user)
})

router.delete('/logout' ,authenticateUser, function(req,res){
    const { user , token } = req
    User.findByIdAndUpdate(user._id , {$pull : { tokens : {token : token}}})
        .then(function(user){
            res.send({notice : 'Logged out successfilly :)'})
        })
        .catch(function(err){
            res.send(err)
        })
})

module.exports = {
    userRouter : router
}