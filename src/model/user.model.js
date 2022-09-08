const User = require('./user.mongo')

async function getAllUser(){
    return await User.find()
}

async function getUserById(id){
    return await User.findById(id)
}

module.exports = {
    getAllUser,
    getUserById
}