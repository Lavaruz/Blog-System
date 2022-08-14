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
authRouter.post('/signin',(req,res)=>{

})

    // SIGNUP
authRouter.get('/signup', (req,res)=>{
    res.render('register')
})
authRouter.post('/signup', async(req,res)=>{
    const hashPassword = await bcrypt.hash(req.body.password, 10)
    const userFind = await userModel.findOne({
        name: req.body.username
    })
    if(userFind){
        console.log('user already exist');
    }else{
        console.log('create user');
        req.session.user = req.body.username
        console.log(req.user);
        // await userModel.create({
        //     name: req.body.username,
        //     password: hashPassword
        // })
        // req.user.name = req.body.username
        // res.redirect('/')
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
