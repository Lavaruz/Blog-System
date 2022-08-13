const {getAllDocs} = require('../../model/home.model')

async function getHome(req,res){
    const docs = await getAllDocs();
    if (req.isAuthenticated()){
        res.render('homeAuth',{
            docs:docs,
            name:req.user.name
        })
    }else{
        res.render('home', {
            docs: docs
        })
    }
}

function logout(req,res){
    req.logout()
    res.redirect('/')
}

module.exports = {
    getHome,
    logout
}