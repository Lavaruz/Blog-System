require('dotenv').config()

const express = require('express')
const path = require('path')
const app = express()
var bodyParser = require('body-parser')
const helmet = require('helmet')
const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const cookieSession = require('cookie-session')

const {submitRouter} = require('./src/route/submit/submit.route')
const {homeRouter} = require('./src/route/home/home.route')
const {blogRouter} = require('./src/route/blog/blog.route')
const {databaseConnect} = require('./services/mongo')

const PORT = process.env.PORT || 3000
const config = {
    CLIENT_ID: process.env.CLIENT_ID,
    CLIENT_SECRET: process.env.CLIENT_SECRET
}

passport.use(new GoogleStrategy({
    clientID: config.CLIENT_ID,
    clientSecret: config.CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    console.log('Google Profile :', profile);
    return done(null, profile)
  }
));

app.use(helmet())
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
    passport.authenticate('google', { failureRedirect: '/', session:false }),
    (req, res) => {
        // Successful authentication, redirect home.
        res.redirect('/');
    }
);

async function startServer(){
    await databaseConnect()
    app.listen(PORT, () => console.log(`server run at port ${PORT}`))
}
startServer()