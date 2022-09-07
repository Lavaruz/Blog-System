const {addNewNews} = require('../../model/submit.model')

function getSubmit(req,res){
    res.render('submit',{
        user: req.user
    })
}

async function postSubmit(req,res){
    // const user = Object.fromEntries(
    //     Object.entries(req.user._doc).filter(([key, value]) => key !== 'password'))
    // console.log(user);

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