const {getAllDocs} = require('../../model/home.model')

async function getHome(req,res){
    const docs = await getAllDocs();
    res.render('home', {
        news: docs,
        user: req.user,
    })
    console.log(req.user);
}   

function logout(req,res){
    req.logout()
    res.redirect('/')
}

module.exports = {
    getHome,
    logout
}