const mongoose = require('mongoose')

const Schema = mongoose.Schema
const patientSchema = new Schema({
    name : {
        type : String,
        required : true
    },
    mobile : {
        type : String,
        required : true ,
        minlength : 10 ,
        maxlength : 10
    },
    email : {
        type : String
    },
    purposeOfVisit : {
        type : [String],
        require : true 
    },
    description : {
        type : String
    },
    createdDateAndTime : {
        type : Date,
        default : new Date().toLocaleDateString()
    },
})

const Patient = mongoose.model('Patient' , patientSchema)

module.exports = {
    Patient
}