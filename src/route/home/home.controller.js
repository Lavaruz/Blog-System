const {getAllDocs, getDocByAutor} = require('../../model/home.model')
const {getUserById} = require('../../model/user.model')
const User = require('../../model/user.mongo')

async function getHome(req,res){
    const docs = await getAllDocs();
    const docByAutor = await getDocByAutor(req.user);

    // const userFollower = await getUserById(req.user.following[1])
    const userFollowing = await User.find({
        '_id': {$in: req.user.following}
    })
    const userFollower = await User.find({
        '_id': {$in: req.user.follower}
    })

    if(!req.user){
        res.render('home', {
            news: docs,
            user: req.user,
        })
    }else{
        res.render('home-auth', {
            news: docs,
            user: req.user,
            docByAutor,
            userFollowing,
            userFollower
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