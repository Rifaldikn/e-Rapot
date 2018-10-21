const express = require('express')
const logger = require('morgan')
const bodyParser = require('body-parser')
const path = require('path')
const mongoose = require('mongoose')
const chalk = require('chalk')
const dotenv = require('dotenv')
const cookieParser = require('cookie-parser')
const session = require('express-session')

/**
 * Load environment variables from .env file, where API keys and passwords are configured.
 */
dotenv.load({ path: '.env.local' })

/**
 * Create Express server.
 */
const app = express()

/**
 * Initialize cookie-parser to allow us access the cookies stored in the browser.
 */

app.use(cookieParser())

/**
 *  Initialize express-session to allow us track the logged-in user across sessions.
 */
app.use(
  session({
    key: 'user_sid',
    secret: 'a4f8071f-c873-4447-8ee2',
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 600000
    }
  })
)
// This middleware will check if user's cookie is still saved in browser and user is not set, then automatically log the user out.
// This usually happens when you stop your express server after login, your cookie still remains saved in the browser.
app.use((req, res, next) => {
  if (req.cookies.user_sid && !req.session.user) {
    res.clearCookie('user_sid')
  }
  next()
})

/**
 * Controllers (route handlers).
 */
const controllers = require('./controllers/')

/**
 * Express configuration.
 */
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

/**
 * Connect to MongoDB.
 */
mongoose.connect(
  'mongodb://localhost:27017/eRapot',
  { useNewUrlParser: true }
)
console.log(process.env.MONGODB_URI)
mongoose.connection.on('error', err => {
  console.error(err)
  console.log(
    '%s MongoDB connection error. Please make sure MongoDB is running.',
    chalk.red('✗')
  )
  process.exit()
})
mongoose.connection.once('open', function () {
  console.log("%s we're connected!", chalk.green('✓'))
})

/**
 * Express configuration.
 */
app.set('host', process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0')
app.set('port', process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080)

/**
 * Primary app routes.
 */
app.post('/postSchool', controllers.postSchool)
app.post('/postAccount', controllers.postAccount)
app.post('/postLogin', controllers.postLogin)
app.post('/postUser', controllers.postUser)
app.get('/getAccount', controllers.getAccount)


/**
 * Start Express server.
 */
app.listen(app.get('port'), () => {
  console.log(
    '%s App is running at http://localhost:%d',
    chalk.green('✓'),
    app.get('port')
  )
})
