'use strict'

const express = require('express')
const router = express.Router()

const logger = require('../config/logger')
const courses = require('../controllers/courses')
const terms = require('../controllers/terms')

router.get('/', async (req, res, next) => {
  try {
    let termInfo = await terms.getAllTerms()
    if (termInfo.hasOwnProperty('msg')) {
      res.status(404).json(termInfo)
      logger.log('warn', `[${req.username}] Attempted to fetch information about all terms but couldn't find anything`)
    } else {
      res.json(termInfo)
      logger.log('info', `[${req.username}] Successfully fetched information about all terms`)
    }
  } catch (error) {
    req.errorText = `[${req.username}] An error has occured when attempting to fetch information about all terms`
    next(error)
  }
})

router.get('/:term', async (req, res, next) => {
  try {
    let termInfo = await terms.getTerm(req.params.term)
    if (termInfo.hasOwnProperty('msg')) {
      res.status(404).json(termInfo)
      logger.log('warn', `[${req.username}] Attempted to fetch information about term ${req.params.term} but couldn't find anything`)
    } else {
      res.json(termInfo)
      logger.log('info', `[${req.username}] Successfully fetched information about term ${req.params.term}`)
    }
  } catch (error) {
    req.errorText = `[${req.username}] An error has occured when attempting to fetch information about term ${req.params.term}`
    next(error)
  }
})

/**
 * Get courses from a specific term
 * @param {string} term The ID of the term
 */
router.get('/:term/courses', async (req, res, next) => {
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

module.exports = router
