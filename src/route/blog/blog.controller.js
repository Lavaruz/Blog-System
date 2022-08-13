const newsModel = require('../../model/news.mongo')

async function getDocsById(req,res){
    const paramId = req.params.id
    let doc = await newsModel.findById(paramId)
    doc.content = doc.content.split('/\r?\n/')
    res.render('blog', {
        doc: doc
    })
    console.log(doc.content);
}

module.exports = {
    getDocsById
}