const express = require('express')

const {getHome, logout} = require('./home.controller')

const homeRouter = express.Router()

homeRouter.get('/', getHome)
homeRouter.post('/',logout)

module.exports = {
    homeRouter
}