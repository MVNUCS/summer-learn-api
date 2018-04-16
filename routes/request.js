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
    logger.log('error', 'An error has occured when fetching results')
    logger.log('error', error)
    res.status(500).json({msg: 'An error has occured when fetching results. Please try again later.'})
  }
})

module.exports = router
