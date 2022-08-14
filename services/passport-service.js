const path = require('path')
require('dotenv').config({path: path.resolve(__dirname, '../.env')})
const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const config = {
    CLIENT_ID: process.env.CLIENT_ID,
    CLIENT_SECRET: process.env.CLIENT_SECRET,
}

passport.serializeUser((user,done)=>{
    const data = {
        name: user.displayName,
        id: user.id
    }
    done(null, data)
})
passport.deserializeUser((user,done)=>{
    done(null, user)
})


passport.use(new GoogleStrategy({
    clientID: config.CLIENT_ID,
    clientSecret: config.CLIENT_SECRET,
    callbackURL: "/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    return done(null, profile)
  }
));