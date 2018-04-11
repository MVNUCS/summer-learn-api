'use strict'

const express = require('express')
const router = express.Router()

const logger = require('../config/logger')

const sheets = require('../services/sheets')
const database = require('../services/database')

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
  logger.log('info', `Database update requested...`)
  try {
    let courseInfo = await sheets.getCourseInfo()
    logger.log('debug', `Got course info from Sheets...`)
    let courses = []
    courseInfo.values.forEach((e) => {
      let course = [e[0].trim(), Number(e[1]), e[2].trim(), e[3].trim(), e[5].trim(), e[6].trim(), Number(e[7]), Number(e[8]), Number((e[0].trim().substring(e[0].trim().length - 1)))]
      courses.push(course)
    })
    let result = await database.insertCourseInfo(courses)
    logger.log('info', `Database operation complete with ${result.affectedRows} rows affected`)
    res.json(result)
  } catch (error) {
    logger.log('error', 'An error has occured when updating the database')
    logger.log('error', error)
    res.status(500).json({msg: 'An error has occured when updating the database. Please try again later.'})
  }
})

module.exports = router
