const {addNewNews} = require('../../model/submit.model')

function getSubmit(req,res){
    res.render('submit')
}

async function postSubmit(req,res){
    const body = req.body
    await addNewNews(body)
    res.redirect('/')
}

module.exports = {
    getSubmit,
    postSubmit
}