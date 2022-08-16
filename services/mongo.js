const path = require('path')
require('dotenv').config({path:path.resolve(__dirname, '../.env')})
const mongoose = require('mongoose')

const DATABASE_CONNECT = process.env.DATABASE_CONNECT
async function databaseConnect(){
    await mongoose.connect(DATABASE_CONNECT)
}

module.exports = {
    databaseConnect
}