const {addNewNews} = require('../../model/submit.model')

function getSubmit(req,res){
    res.render('submit',{
        user: req.user
    })
}

async function postSubmit(req,res){
    const body = req.body
    body.autor = req.user
    body.image = req.file
    await addNewNews(body)
    res.redirect('/')
}

module.exports = {
    getSubmit,
    postSubmit
}