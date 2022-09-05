const mongoose = require('mongoose')
const User = require('./user.mongo')

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
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    date:{
        type:String,
        required: true 
    },
    newsId:{
        type:Number,
        required:true
    },
    image:{
        type:mongoose.SchemaTypes.Mixed,
        default: ""
    }
})

module.exports = mongoose.model('New',submitSchema)