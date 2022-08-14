const {getAllDocs} = require('../../model/home.model')
const userModel = require('../../model/user.mongo')


async function getHome(req,res){
    const docs = await getAllDocs();
    const user = await userModel.findById(req.user)
    res.render('home', {
        news: docs,
        user: user,
    })
}   

function logout(req,res){
    req.logout()
    res.redirect('/')
}

module.exports = {
    getHome,
    logout
}