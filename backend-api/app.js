const express = require('express')
const logger = require('morgan')
const bodyParser = require('body-parser')
const path = require('path')
const mongoose = require('mongoose')
const chalk = require('chalk')

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true })
mongoose.connection.on('error', (err) => {
  console.error(err)
  console.log('%s MongoDB connection error. Please make sure MongoDB is running.', chalk.red('✗'))
  process.exit()
})

const app = express()

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.listen(app.get('port'), () => {
  console.log('%s App is running at http://localhost:%d in %s mode', chalk.green('✓'), app.get('port'), app.get('env'))
  console.log('  Press CTRL-C to stop\n')
})
