'use strict'

const express = require('express')
const router = express.Router()

const logger = require('../config/logger')

const Responses = require('../controllers/responses')

/**
 * Request fulfillment of an intent from Dialogflow
 */
router.post('/', async (req, res, next) => {
  try {
    logger.log('debug', `[${req.username}] Attempting to respond to query "${req.body.queryResult.queryText}" ...`)
    let request = Responses.createRequest(req.body.queryResult.queryText, req.body.queryResult.parameters, req.body.queryResult.intent.displayName)
    let response = await Responses.createResponse(request)
    res.json(response)
    logger.log('info', `[${req.username}] Successfully generated a response for intent "${request.intent}"`)
  } catch (error) {
    req.errorText = 'An error has occured when creating the response object'
    next(error)
  }
})

module.exports = router
