const express = require('express')
const passport = require('passport')

const authRouter = express.Router()

authRouter.get('/signin', (req,res)=>{
    res.render('signin')
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
