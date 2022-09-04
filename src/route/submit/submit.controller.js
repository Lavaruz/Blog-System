const {addNewNews} = require('../../model/submit.model')

function getSubmit(req,res){
    res.render('submit')
}

async function postSubmit(req,res){
    const body = req.body
    body.autor = req.user.name
    body.imageURL = req.file.filename
    await addNewNews(body)
    res.redirect('/')
}

module.exports = {
    getSubmit,
    postSubmit
}