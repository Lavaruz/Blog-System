const mongoose = require('mongoose')

const submitSchema = new mongoose.Schema({
    title: {
        type:String,
        required: true
    },
    content:{
        type:String,
        required: true 
    },
    mksa: {
        type:String,
        required: true
    },
    autor:{
        type:String,
        required: true 
    },
    date:{
        type:Date,
        required: true 
    },
})

module.exports = mongoose.model('New',submitSchema)