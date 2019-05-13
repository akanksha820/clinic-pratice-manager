const mongoose = require('mongoose')
const validator = require('validator')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = mongoose.Schema({
    username : {
        type : String,
        required : true
    },
    // mobile : {
    //     type: Number ,
    //     required : true ,
    //     minlength : 10 ,
    //     maxlength : 10
    // },
    email : {
        type : String,
        unique : true,
        validate : {
            validator : function(email){
                return validator.isEmail(email)
            },
            message : function(){
                return 'Invalid email format'
            }
        }
    },
    password : {
        type : String,
        required : true
    },
    role : {
        type : String,
        required : true,
        default : 'patient'
    },
    tokens : [
        {
            token : {
                type : String
            },
            createdAt : {
                type : Date,
                default : Date.now()
            }
        }
        
    ]
})



userSchema.pre('save' , function(next){
    const user = this
    // console.log(this.collection.countDocuments())
    if(user.isNew){
        bcryptjs.genSalt(10)
            .then(function(salt){
                bcryptjs.hash(user.password , salt)
                    .then(function(encryptedPwd){
                        user.password = encryptedPwd
                        next()
                    })
            })
    }else{
        next()
    }
})


userSchema.statics.findByCredentials = function(email,password){
    const User = this
    return User.findOne({email})
        .then(function(user) {
            if(!user){
                return Promise.reject({notice : '...Invalid email'})
            }
            return bcryptjs.compare(password , user.password)
                    .then(function(result) {
                        if(result){
                            return Promise.resolve(user)
                        }else {
                            return Promise.reject({notice : 'Invalid password'})
                        }
                    })
        })
        .catch(function(err){
            return Promise.reject(err)
        })

}


userSchema.methods.generateToken = function(){
    const user = this
    const tokenData = {
        _id : user._id ,
        name : user.username ,
        createdAt : Number(new Date())
    }
    const token = jwt.sign(tokenData , 'jwt@123')
    user.tokens.push({token})
    return user.save()
        .then(function(user){
            return Promise.resolve(token)
        })
        .catch(function(err){
            return Promise.reject(err)
        })
}

userSchema.statics.findByToken = function(token){
    const User = this
    let tokenData
    try{
        tokenData = jwt.verify(token , 'jwt@123')
    }
    catch(err){
        return Promise.reject(err)
    }
    return User.findOne({
        _id : tokenData._id ,
        'tokens.token' : token
    })
}


const User = mongoose.model('User' , userSchema)

module.exports = {
    User
}



