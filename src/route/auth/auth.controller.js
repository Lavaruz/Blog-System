function getSignIn (req,res){
    res.render('signin',{
        user: req.user
    })
}

function getSignUp(req,res){
    res.render('register')
}

module.exports = {
    getSignIn,
    getSignUp
}