const {getDocById, getAllDocs} = require('../../model/home.model')

async function getDocsById(req,res){
    let doc = await getDocById(req.params.id)
    let docs = await (await getAllDocs()).slice(0,4)
    let content = doc.content.split('\n')
    res.render('blog', {
        doc: doc,
        docs:docs,
        user: req.user,
        content: content
    })
}

module.exports = {
    getDocsById
}