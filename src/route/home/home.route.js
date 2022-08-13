const express = require('express')

const {getHome} = require('./home.controller')

const homeRouter = express.Router()

homeRouter.get('/', getHome)

module.exports = {
    homeRouter
}