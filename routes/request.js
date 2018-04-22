'use strict'

const express = require('express')
const router = express.Router()

const Responses = require('../controllers/responses')

/**
 * Request fulfillment of an intent from Dialogflow
 */
router.post('/', async (req, res, next) => {
  try {
    let request = Responses.createRequest(req.body.queryResult.queryText, req.body.queryResult.parameters, req.body.queryResult.intent.displayName)
    let response = await Responses.createResponse(request)
    res.json(response)
  } catch (error) {
    req.errorText = 'An error has occured when creating the response object'
    next(error)
  }
})

module.exports = router
