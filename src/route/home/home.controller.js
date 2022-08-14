const {getAllDocs} = require('../../model/home.model')
const userModel = require('../../model/user.mongo')


async function getHome(req,res){
    const docs = await getAllDocs();
    const user = await userModel.findOne({
        name: req.user || req.session.user
    })
    res.render('home', {
        news: docs,
        user: user,
    })
}   

function logout(req,res){
    req.logout()
    req.session = null
    res.redirect('/')
}

module.exports = {
    getHome,
    logout
}