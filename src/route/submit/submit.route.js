const express = require('express')

const {getSubmit, postSubmit} = require('./submit.controller')

const submitRouter = express.Router()

submitRouter.get('/', getSubmit)
submitRouter.post('/', postSubmit)

module.exports = {
    submitRouter
}