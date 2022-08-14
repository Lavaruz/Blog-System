const newsModel = require('../../model/news.mongo')
const userModel = require('../../model/user.mongo')

async function getDocsById(req,res){
    const paramId = req.params.id
    let doc = await newsModel.findById(paramId)
    const user = await userModel.findOne({
        name: req.user || req.session.user
    })
    res.render('blog', {
        doc: doc,
        user: user
    })
}

module.exports = {
    getDocsById
}