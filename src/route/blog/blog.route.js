const express = require('express')

const {getDocById, getDocByAutor} = require('../../model/home.model')
const {getUserById} = require('../../model/user.model')

const blogRouter = express.Router()

// blogRouter.post('/', async(req,res)=>{
//     // let doc = await getDocById(req.params.id)
//     // let User = await getUserById(doc.autor.id)
//     console.log(req.params);
//     res.redirect('/')
// })
blogRouter.get('/:id', async(req,res)=>{
    let doc = await getDocById(req.params.id)
    let docByAutor = await getDocByAutor(doc.autor)
    let content = doc.content.split('\n')
    res.render('blog', {
        doc: doc,
        docByAutor:docByAutor,
        user: req.user,
        content: content
    })
})

module.exports = {
    blogRouter
}