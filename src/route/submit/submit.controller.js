const {saveNews} = require('../../model/submit.model')

function getSubmit(req,res){
    res.render('submit')
}

async function postSubmit(req,res){
    const body = req.body
    console.log(body);
    // await saveNews(body);
}

module.exports = {
    getSubmit,
    postSubmit
}