const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    googleId: String,
    name:{
        type: String,
        required: true
    },
    image:{
        type: String,
        default: ''
    },
    email:{
        type: String,
        default: ''
    },
    password:String,
    description: {
        type: String,
        default: 'No description'
    },
    follower: {
        type: Number,
        default: 0
    }
})

module.exports = mongoose.model('User', userSchema)