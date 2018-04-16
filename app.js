'use strict'

require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')

const logger = require('./config/logger')
const keys = require('./config/keys')

const courses = require('./routes/courses')
const options = require('./routes/options')
const request = require('./routes/request')

// const Response = require('./controllers/response')

/** The express server used to serve the API that controls the connector */
const app = express()

/** Middleware for getting information from a POST request */
app.use(bodyParser.json())

/** Routes for our API */
app.use('/courses', courses)
app.use('/options', options)
app.use('/request', request)

/** Starting the server */
app.listen(keys.express.port, () => logger.log('info', `Server started on port ${keys.express.port}`))

// ;(async () => {
//   let resp = new Response('agent', 'What classes can I take during the C6 term?', {'Term': 'A6'}, 'test-intent', {})
//   console.log(await resp.createResponse())
// })()
