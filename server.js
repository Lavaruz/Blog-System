require('dotenv').config()
require('./services/passport-service')

const express = require('express')
const path = require('path')
const app = express()
var bodyParser = require('body-parser')
const helmet = require('helmet')
const passport = require('passport')
const cookieSession = require('cookie-session')

const {firstNews, news} = require('./src/model/submit.model')
const {submitRouter} = require('./src/route/submit/submit.route')
const {homeRouter} = require('./src/route/home/home.route')
const {blogRouter} = require('./src/route/blog/blog.route')
const {authRouter} = require('./src/route/auth/auth.route')
const {databaseConnect} = require('./services/mongo')

const config = {
    PORT: process.env.PORT || 3000,
    COOKIES_KEY1: process.env.COOKIES_KEY1,
    COOKIES_KEY2: process.env.COOKIES_KEY2
}

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
app.use('/auth', authRouter)



async function startServer(){
    await databaseConnect()
    app.listen(config.PORT, () => console.log(`server run at port ${config.PORT}`))
}
startServer()