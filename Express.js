const express = require('express')
const port = process.env.PORT || 5000

const bodyParser = require('body-parser')
const db = require('./configs/mongoose')
const sass = require('sass')
const passport = require('passport')
const localStrategy = require('./configs/passport')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const cookieParser = require('cookie-parser')

const app = express()

// socket configuration 
const chatServer  = require('http').Server(app)
const chatSockets = require('./configs/chat_sockets').chatSockets(chatServer)
chatServer.listen(3000)

app.use(express.static('assets'))
app.use(bodyParser.urlencoded({extended:true})) //parser
app.use(cookieParser())

app.set('view engine','ejs')
app.set('views','./views')

app.use(session({
    name:"user",
    secret:"Floki@",
    resave:false,
    saveUninitialized:false,
    cookie:{maxAge:(1000*60*100)},
    store:MongoStore.create({
        mongoUrl:'mongodb+srv://Lakshminarasimha:260q07kemOX4IhSI@cluster0.vl6ivz4.mongodb.net/CHIT-CHAT?retryWrites=true&w=majority',
        autoRemove:'disabled'
    })
}))

app.use(passport.initialize())
app.use(passport.session())

app.use(passport.setAuthenticatedUser)
app.use('/',require('./routes/index.js'))

// Making server active listening
app.listen(port,function(err){
    if(err){
        return console.log("error listening to the port",err)
    }
    return console.log("Server successfully running on port:",port)
})
