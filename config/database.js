const mongoose = require('mongoose')
mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost:27017/clinic-manager' , {useNewUrlParser:true})
    .then(function(){
        console.log('Connected to the DB !:)')
    })
    .catch(function(){
        console.log('OOPS..! Something went wromg:(')
    })

module.exports = {
    mongoose
}
