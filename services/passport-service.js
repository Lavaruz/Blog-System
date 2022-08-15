const path = require('path')
require('dotenv').config({path: path.resolve(__dirname, '../.env')})
const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')

const userModel = require('../src/model/user.mongo')

const config = {
    CLIENT_ID: process.env.CLIENT_ID,
    CLIENT_SECRET: process.env.CLIENT_SECRET,
}

passport.serializeUser((user,done)=>{
    done(null, user.id)
})
passport.deserializeUser(async(userId,done)=>{
    const user = await userModel.findById(userId,'-__v')
    done(null, user)
})


passport.use(new GoogleStrategy({
    clientID: config.CLIENT_ID,
    clientSecret: config.CLIENT_SECRET,
    callbackURL: "/auth/google/callback"
  },
  async function(accessToken, refreshToken, profile, done) {
    const user = await userModel.findOneAndUpdate({
        googleId:profile.id
    },{
        name: profile._json.name,
        googleId: profile.id,
        image: profile._json.picture,
        email: profile._json.email,
        password: await bcrypt.hash('-aoisdhjfdio-asjfdh1029/-',10)
    },{
        upsert: true,
        new: true
    })
    done(null,user)
  }
));


passport.use(new LocalStrategy(
    async function(username, password, done) {
        const User = await userModel.findOne({ name: username });
        if (!User){
            done(null, false, {message: 'username not found !'});
        } 
        try{
            if(await bcrypt.compare(password, User.password)){
                done(null, User)
            }else{
                done(null, false, {message: 'password incorrect !'})
            } 
        }catch(e){
            done(e)
        }
    }
));