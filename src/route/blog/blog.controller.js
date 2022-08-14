const userModel = require('../../model/user.mongo')
const { findById } = require('../../model/user.mongo')

async function getDocsById(req,res){
    const paramId = req.params.id
    let doc = await newsModel.findById(paramId)
    const user = await userModel.findById(req.user)
    res.render('blog', {
        doc: doc,
        user: user
    })
}

module.exports = {
    getDocsById
}