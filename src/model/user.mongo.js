const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name:String,
    googleId:Number,
    image:String,
    email:String,
    password:String
})

module.exports = mongoose.model('User', userSchema)