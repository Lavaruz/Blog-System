const {getAllDocs, getDocByAutor} = require('../../model/home.model')

async function getHome(req,res){
    const docs = await getAllDocs();
    const docByAutor = await getDocByAutor(req.user);
    if(!req.user){
        res.render('home', {
            news: docs,
            user: req.user,
        })
    }else{
        res.render('home-auth', {
            news: docs,
            user: req.user,
            docByAutor: docByAutor
        })
    }
    
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