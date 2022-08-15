const newsModel = require('../../model/news.mongo')

async function getDocsById(req,res){
    const paramId = req.params.id
    let doc = await newsModel.findById(paramId)
    res.render('blog', {
        doc: doc,
        user: req.user
    })
}

module.exports = {
    getDocsById
}