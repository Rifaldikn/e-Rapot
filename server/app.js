const express = require('express')
const logger = require('morgan')
const bodyParser = require('body-parser')
const path = require('path')
const mongoose = require('mongoose')
const chalk = require('chalk')
const dotenv = require('dotenv')

/**
 * Load environment variables from .env file, where API keys and passwords are configured.
 */
dotenv.load({ path: '.env.local' })

/**
 * Create Express server.
 */
const app = express()

/**
 * Controllers (route handlers).
 */
const schoolController = require('./controllers/')

/**
 * Express configuration.
 */
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

/**
 * Connect to MongoDB.
 */
mongoose.connect('mongodb://localhost:27017/eRapot', { useNewUrlParser: true })
console.log(process.env.MONGODB_URI)
mongoose.connection.on('error', (err) => {
  console.error(err)
  console.log('%s MongoDB connection error. Please make sure MongoDB is running.', chalk.red('✗'))
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
app.post('/initSchool', schoolController.initSchool)
app.post('/createUser', schoolController.createUser)

/**
 * Start Express server.
 */
app.listen(app.get('port'), () => {
  console.log('%s App is running at http://localhost:%d', chalk.green('✓'),  app.get('port'))
})
