const express = require('express')

const {getDocsById} = require('./blog.controller')

const blogRouter = express.Router()

blogRouter.get('/:id', getDocsById)

module.exports = {
    blogRouter
}