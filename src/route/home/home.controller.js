const {getAllDocs} = require('../../model/home.model')

async function getHome(req,res){
    const docs = await getAllDocs();
    res.render('home', {
        docs: docs
    })
}

module.exports = {
    getHome
}