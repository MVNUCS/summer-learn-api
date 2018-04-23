'use strict'

require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const helmet = require('helmet')

const logger = require('./config/logger')
const keys = require('./config/keys')

const courses = require('./routes/courses')
const terms = require('./routes/terms')
const options = require('./routes/options')
const request = require('./routes/request')

const Auth = require('./services/authentication')
const api = require('./controllers/api')

/** The express server used to serve the API */
const app = express()

/** Middleware for getting information from a POST request */
app.use(bodyParser.json())

/** Middleware to set headers to protect Express */
app.use(helmet())

/** Middleware to authenticate our users */
app.use(Auth.authenticate)

/** Routes for our API */
app.use('/courses', courses)
app.use('/terms', terms)
app.use('/options', options)
app.use('/request', request)

/** Default route handler */
app.get('*', (req, res, next) => {
  let ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress
  logger.log('warn', `[${ip}] Tried to access an invalid endpoint`)
  res.status(404).json({msg: 'The resource requested does not exist'})
})

/** Error handler */
app.use((err, req, res, next) => {
  logger.log('error', (req.errorText === undefined ? 'An error has occured' : req.errorText))
  logger.log('error', err)
  res.status(500).json({msg: `An error has occured. Please try again later`, text: req.errorText})
})

app.listen(keys.express.port, () => {
  logger.log('info', `Server started on port ${keys.express.port}`)
  api.updateCache()
    .then(() => logger.log('info', 'Initial cache update complete'))
    .catch((error) => {
      logger.log('error', 'An error has occured during the initial cache update')
      logger.log('error', error)
    })
})

module.exports = app
