'use strict'

const express = require('express')
const router = express.Router()

const logger = require('../config/logger')

const API = require('../controllers/api')

/**
 * Checks the health status of Sheets and the MySQL database
 */
router.get('/health', (res, req, next) => {
  logger.log('info', '/options/health')
})

/**
 * Updates the database with the latest changes from Sheets
 */
router.get('/update', async (req, res, next) => {
  try {
    let result = await API.updateCache()
    res.json(result)
  } catch (error) {
    logger.log('error', 'An error has occured when updating the database')
    logger.log('error', error)
    res.status(500).json({msg: 'An error has occured when updating the database. Please try again later.'})
  }
})

module.exports = router
