require('dotenv').config()

const express = require('express')
const path = require('path')
const app = express()
var bodyParser = require('body-parser')
const helmet = require('helmet')
const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const cookieSession = require('cookie-session')

const {firstNews, news} = require('./src/model/submit.model')
const {submitRouter} = require('./src/route/submit/submit.route')
const {homeRouter} = require('./src/route/home/home.route')
const {blogRouter} = require('./src/route/blog/blog.route')
const {databaseConnect} = require('./services/mongo')

const PORT = process.env.PORT || 3000
const config = {
    CLIENT_ID: process.env.CLIENT_ID,
    CLIENT_SECRET: process.env.CLIENT_SECRET,
    COOKIES_KEY1: process.env.COOKIES_KEY1,
    COOKIES_KEY2: process.env.COOKIES_KEY2
}

passport.use(new GoogleStrategy({
    clientID: config.CLIENT_ID,
    clientSecret: config.CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    return done(null, profile)
  }
));

app.use(helmet())
app.use(cookieSession({
    name: 'GOOGLE_SES_AUTH',
    maxAge: 1000*60*60*24,
    keys:[config.COOKIES_KEY1, config.COOKIES_KEY2]
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')))
app.set('view engine', 'ejs')


app.use('/', homeRouter)
app.use('/submit', submitRouter)
app.use('/blog', blogRouter)

app.get('/signin', (req,res)=>{
    res.render('signin')
})
app.get('/auth/google',
    passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/auth/google/callback', 
    passport.authenticate('google', { failureRedirect: '/' }),
    (req, res) => {
        // Successful authentication, redirect home.
        res.redirect('/');
    }
);


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


async function startServer(){
    await databaseConnect()
    app.listen(PORT, () => console.log(`server run at port ${PORT}`))
}
startServer()