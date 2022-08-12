const express = require('express')
const path = require('path')
const app = express()
var bodyParser = require('body-parser')

const {submitRouter} = require('./src/route/submit/submit.route')
const {databaseConnect} = require('./services/mongo')

const PORT = process.env.PORT || 3000

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')))
app.set('view engine', 'ejs')


app.get('/', (req,res)=>{
    res.render('home', {
        name: 'Assami Muzaki'
    })
})
app.use('/submit', submitRouter)

app.get('/signin', (req,res)=>{
    res.render('signin')
})

async function startServer(){
    await databaseConnect()
    app.listen(PORT, () => console.log(`server run at port ${PORT}`))
}
startServer()