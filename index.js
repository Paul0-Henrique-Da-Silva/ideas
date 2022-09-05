const flash = require('express-flash')
const exphbs = require('express-handlebars')
const express = require('express')
const session = require('express-session')
const FileStore = require('session-file-store')(session)

const conn = require('./db/conn')

const app = express()

// models
const Idea = require('./models/Idea')
const User = require('./models/User')


// import rourtes
const ideasRoutes = require('./routes/ideasRoutes')
const authRoutes = require('./routes/authRoutes')

// Import Controller
const IdeaController = require('./controllers/IdeaController')

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
app.use((request, response, next) => {
    if(request.session.userid){
        response.locals.session = request.session }
    next()    
})

//Routes
app.use('/ideas', ideasRoutes)
app.use('/', authRoutes)

app.get('/', IdeaController.showIdeas)

conn.sync({force: true}).then(() => app.listen(3000)
).catch((Error) => console.log(Error))

