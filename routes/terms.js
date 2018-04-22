'use strict'

const express = require('express')
const router = express.Router()

const logger = require('../config/logger')
const courses = require('../controllers/courses')

/**
 * Get courses from a specific term
 * @param {string} term The ID of the term
 */
router.get('/:term', async (req, res, next) => {
  try {
    let courseInfo = await courses.getCoursesByTerm(req.params.term)
    if (courseInfo.hasOwnProperty('msg')) {
      res.status(404).json(courseInfo)
      logger.log('warn', `[${req.username}] Attempted to fetch information for courses in term ${req.params.term} but couldn't find anything`)
    } else {
      res.json(courseInfo)
      logger.log('info', `[${req.username}] Successfully fetched information for all courses in term ${req.params.term}`)
    }
  } catch (error) {
    req.errorText = `[${req.username}] An error has occured when attempting to fetch courses from the term ${req.params.term}`
    next(error)
  }
})

/**
 * Get the dates for the specified term
 * @param {string} term The ID of the term
 */
router.get('/:term/dates', async (req, res, next) => {
  try {
    let dates = await courses.getTermDates(req.params.term)
    res.json(dates)
  } catch (error) {
    req.errorText = `[${req.username}] An error has occured when attempting to fetch dates for the term ${req.params.term}`
    next(error)
  }
})

module.exports = router
