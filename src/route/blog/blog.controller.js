const {getDocById, getAllDocs, getDocByAutor} = require('../../model/home.model')

async function getDocsById(req,res){
    let doc = await getDocById(req.params.id)
    let docByAutor = await getDocByAutor(doc.autor)
    let content = doc.content.split('\n')
    res.render('blog', {
        doc: doc,
        docByAutor:docByAutor,
        user: req.user,
        content: content
    })
}

module.exports = {
    getDocsById
}