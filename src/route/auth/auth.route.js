const express = require('express')
const passport = require('passport')
const bcrypt = require('bcrypt')
const userModel = require('../../model/user.mongo')

const {getSignIn, getSignUp} = require('./auth.controller')

const authRouter = express.Router()


    // SIGNIN
authRouter.get('/signin',getSignIn)
authRouter.post('/signin',passport.authenticate('local', {
    failureRedirect: '/auth/signin',
    successRedirect: '/'
}))




    // SIGNUP
authRouter.get('/signup', getSignUp)
authRouter.post('/signup', async(req,res)=>{
    try{
        const hashPassword = await bcrypt.hash(req.body.password, 10)
        await userModel.findOneAndUpdate({
            name: req.body.username
        },{
            name: req.body.username,
            password: hashPassword,
        },{upsert:true})
        passport.authenticate('local')(req,res,()=>{
            res.redirect('/')
        })
    }catch{
        res.redirect('/auth/signup')
    }
})


// GOOGLE OAUTH2.0
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
