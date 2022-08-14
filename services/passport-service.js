const path = require('path')
require('dotenv').config({path: path.resolve(__dirname, '../.env')})
const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const userModel = require('../src/model/user.mongo')

const config = {
    CLIENT_ID: process.env.CLIENT_ID,
    CLIENT_SECRET: process.env.CLIENT_SECRET,
}

passport.serializeUser((user,done)=>{
    done(null, user.id)
})
passport.deserializeUser(async(userId,done)=>{
    // const user = await userModel.findById(userId,'-__v')
    // done(null, user)
    done(null, userId)
})


passport.use(new GoogleStrategy({
    clientID: config.CLIENT_ID,
    clientSecret: config.CLIENT_SECRET,
    callbackURL: "/auth/google/callback"
  },
  async function(accessToken, refreshToken, profile, done) {
    // const user = await userModel.findOne({
    //     googleId: profile.id
    // })
    // if(user){
    //     done(null, user)
    // }else{
    //     const newDoc = await userModel.create({
    //         name: profile._json.name,
    //         googleId: profile.id,
    //         image: profile._json.picture,
    //         email: profile._json.email
    //     })
    //     done(null, newDoc)
    // }
    const user = await userModel.findOneAndUpdate({
        googleId:profile.id
    },{
        name: profile._json.name,
        googleId: profile.id,
        image: profile._json.picture,
        email: profile._json.email
    },{
        upsert: true,
        new: true
    })
    done(null,user)
  }
));