'use strict'

require('dotenv').config()
const express = require('express')

const logger = require('./config/logger')

const courses = require('./routes/courses')
const options = require('./routes/options')

/** The express server used to serve the API that controls the connector */
const app = express()

app.use('/courses', courses)
app.use('/options', options)

/** Port that the API will use */
const port = process.env.PORT || 8080

/** Starting the server */
app.listen(port, () => logger.log('info', `Server started on port ${port}`))
