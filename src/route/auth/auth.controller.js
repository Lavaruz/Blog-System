function getSignIn (req,res){
    res.render('signin',{
        user: req.user,
        messages: req.flash('error')
    })
    console.log(messages);
}

function getSignUp(req,res){
    res.render('register')
}

module.exports = {
    getSignIn,
    getSignUp
}