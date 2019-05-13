const express = require('express')
const router = express.Router()
const { Patient }  = require('../models/patient')

router.get('/' , function(req,res){
    Patient.find()
        .then(function(patients){
            res.send(patients)
        })
        .catch(function(err){
            res.send(err)
        })
})

router.post('/' , function(req,res){
    const body = req.body
    const patient = new Patient(body)
    patient.save()
        .then(function(patient){
            res.send(patient)
        })
        .catch(function(err){
            res.send(err)
        })
})
router.put('/:id' , function(req,res){
    const id = req.params.id
    const body = req.body
    Patient.findByIdAndUpdate(id , {$set : body} , {new : true , runValidators : true})
        .then(function(patient){
            res.send(patient)
        })
        .catch(function(err){
            res.send(err)
        })
})
router.delete('/:id', function(req,res){
    const id = req.params.id
    Patient.findByIdAndDelete(id)
        .then(function(patient){
            res.send(patient)
        })
        .catch(function(err){
            res.send(err)
        })
})

router.get('/:id' , function(req,res){
    const id = req.params.id
    Patient.findById(id)
        .then(function(patient){
            res.send(patient)
        })
        .catch(function(err){
            res.send(err)
        })
})

module.exports = {
    patientRouter : router
}