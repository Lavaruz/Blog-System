const newsModel = require('../../model/news.mongo')

async function getDocsById(req,res){
    const paramId = req.params.id
    let doc = await newsModel.findById(paramId)
    let content = doc.content.split('\n')
    res.render('blog', {
        doc: doc,
        user: req.user,
        content: content
    })
}

module.exports = {
    getDocsById
}