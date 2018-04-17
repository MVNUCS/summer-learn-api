'use strict'

const express = require('express')
const router = express.Router()

const logger = require('../config/logger')

const Response = require('../controllers/response')

router.post('/', async (req, res, next) => {
  try {
    let response = new Response(req.body.result.source, req.body.result.resolvedQuery, req.body.result.parameters,
      req.body.result.metadata.intentName, req.body.result.contexts)
    let responseObject = await response.createResponse()
    res.json(responseObject)
  } catch (error) {
    req.errorText = 'An error has occured when creating the response object'
    next(error)
  }
})

module.exports = router
