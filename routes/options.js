'use strict'

const express = require('express')
const router = express.Router()

const logger = require('../config/logger')

const sheets = require('../data/sheets')
const database = require('../data/database')

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
    let courseInfo = await sheets.getCourseInfo()
    let courses = []
    courseInfo.values.forEach((e) => {
      let course = [e[0].trim(), Number(e[1]), e[2].trim(), e[3].trim(), e[5].trim(), e[6].trim(), Number(e[7]), Number(e[8]), Number((e[0].trim().substring(e[0].trim().length - 1)))]
      courses.push(course)
    })
    let result = await database.insertCourseInfo(courses)
    res.json(result)
  } catch (e) {
    logger.log('error', e)
    res.json({msg: 'An error has occured'})
  }
})

module.exports = router
