'use strict'

const express = require('express')
const router = express.Router()

const {logger} = require('../config')

/**
 * Checks the health status of Sheets and the MySQL database
 */
router.get('/health', (res, req, next) => {
  logger.log('info', '/options/health')
})

/**
 * Updates the database with the latest changes from Sheets
 */
router.get('/update', (res, req, next) => {
  logger.log('info', '/options/update')
})

module.exports = router
