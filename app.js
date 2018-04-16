'use strict'

require('dotenv').config()
const keys = require('./config/keys')
const API = require('./controllers/api')
const api = new API(keys.express.port)

api.initServer()
