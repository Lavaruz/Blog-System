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
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'User',
        default: []
    },
    following: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'User',
        default: []
    }
})

module.exports = mongoose.model('User', userSchema)