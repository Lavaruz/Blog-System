require('dotenv').config()
require('./services/passport-service')

const express = require('express')
const path = require('path')
const app = express()
var bodyParser = require('body-parser')
const passport = require('passport')
const cookieSession = require('cookie-session')
const multer = require('multer')

const {submitRouter} = require('./src/route/submit/submit.route')
const {homeRouter} = require('./src/route/home/home.route')
const {blogRouter} = require('./src/route/blog/blog.route')
const {authRouter} = require('./src/route/auth/auth.route')
const {editRouter} = require('./src/route/profile-edit/profile-edit')
const {databaseConnect} = require('./services/mongo')

const {newsRouter} = require('./src/route/v1/news')

let COOKIES_KEY1= process.env.COOKIES_KEY1
let COOKIES_KEY2= process.env.COOKIES_KEY2

const fileStorage = multer.diskStorage({
  destination: (req,file,cb) => {
    cb(null, 'public/img')
  },
  filename: (req,file, cb) => {
    cb(null, Date.now().toString() + '-' + file.originalname)
  }
})

const fileFilter = (req,file,cb) => {
  if(file.mimetype == 'image/png' || file.mimetype == 'image/jpg' || file.mimetype == 'image/jpeg' ){
    cb(null, true)
  }else{
    cb(null, false)
  }
}

app.use(multer({storage: fileStorage, fileFilter: fileFilter}).single('image'))
app.use(cookieSession({
    name: 'GOOGLE_SES_AUTH',
    maxAge: 1000*60*60*24,
    keys:[COOKIES_KEY1, COOKIES_KEY2]
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')))
app.set('view engine', 'ejs')

app.use('/api/v1', newsRouter)
app.use('/', homeRouter)
app.use('/submit', submitRouter)
app.use('/blog', blogRouter)
app.use('/auth', authRouter)
app.use('/account', editRouter)


let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}


async function startServer(){
  await databaseConnect()
  app.listen(port, () => console.log(`server run at port ${port}`))
}
startServer()
module.exports = app