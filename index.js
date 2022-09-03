const app = require('express')()
const flash = require('express-flash')
const exphbs = require('express-handlebars')
const session = require('express-session')
const fileStore = require('session-file-store')(session)

const conn = require('./db/conn')

conn.sync().then(() => app.listen(3000)
).catch((Error) => console.log(Error))

