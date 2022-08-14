const express = require('express')
const passport = require('passport')
const bcrypt = require('bcrypt')

const userModel = require('../../model/user.mongo')

const authRouter = express.Router()

    // SIGNIN
authRouter.get('/signin', (req,res)=>{
    res.render('signin',{
        user: req.user
    })
})
authRouter.post('/signin',async(req,res)=>{
    const username = req.body.username
    const user = await userModel.findOne({name: username})
    if (!user){
        res.redirect('/auth/signin')
    }else{
        await bcrypt.compare(req.body.password, user.password, (err,result)=>{
            if(!result){
                res.redirect('/auth/signin')
            }else{
                res.session.user = req.body.username
                res.redirect('/')
            }
        })
    }
})




    // SIGNUP
authRouter.get('/signup', (req,res)=>{
    res.render('register')
})
authRouter.post('/signup', async(req,res, next)=>{
    const hashPassword = await bcrypt.hash(req.body.password, 10)
    const userFind = await userModel.findOne({
        name: req.body.username
    })
    if(userFind){
        res.redirect('/auth/signin')
    }else{
        req.session.user = req.body.username
        await userModel.create({
            name: req.body.username,
            password: hashPassword
        })
        res.redirect('/')
    }
})

authRouter.get('/google',
    passport.authenticate('google', { scope: ['profile', 'email'] }));

authRouter.get('/google/callback', 
    passport.authenticate('google', { failureRedirect: '/' }),
    (req, res) => {
        // Successful authentication, redirect home.
        res.redirect('/');
    }
);

module.exports = {
    authRouter
}
