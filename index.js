const flash = require('express-flash')
const exphbs = require('express-handlebars')
const express = require('express')
const session = require('express-session')
const FileStore = require('session-file-store')(session)

const conn = require('./db/conn')

const app = express()

// Templete engine
app.engine('handlebars', exphbs())
app.set('view engine', 'handlebars')

// receber resposta do bory
app.use(
    express.urlencoded({
        extended: true
    })
)

//receber dado em json
app.use(express.json())

//session  middleware , onde express vai salvar a sessoes
app.use(
    session({
        name: 'session',
        secret: 'nosso_secret',
        resave: false,
        saveUninitialized: false,
        store: new FileStore({
            logFn: function() {},
            path: require('path').join(require('os').tmpdir(), 'sessions'),
        }),
        cookie: {
            secure: false,
            maxAge: 360000,
            expires: new Date(Date.now() + 360000),
            httpOnly: true
        }
    })
)

//flash message
app.use(flash())

// arquivo publicos
app.use(express.static('public'))

// configurar a sesseion para res
app.use((resquest, response, next) =>{
    if(resquest.session.userid){
        response.locals.session = request.session }
    next()    
})


conn.sync().then(() => app.listen(3000)
).catch((Error) => console.log(Error))

