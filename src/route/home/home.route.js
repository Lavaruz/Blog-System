const express = require('express')

const {getHome, logout} = require('./home.controller')

const homeRouter = express.Router()

homeRouter.get('/', getHome)
homeRouter.get('/logout',logout)

module.exports = {
    homeRouter
}