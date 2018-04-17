'use strict'

const express = require('express')
const router = express.Router()

const logger = require('../config/logger')

const Course = require('../controllers/course')

/**
 * Gets all courses
 */
router.get('/', async (req, res, next) => {
  try {
    let courseInfo = await Course.getAllCourses()
    res.json(courseInfo)
    logger.log('info', 'Fetched information for all courses')
  } catch (error) {
    req.errorText = 'An error has occured when fetching all courses'
    next(error)
  }
})

/**
 * Get a specific course
 * @param {string} course The ID of the course
 * @param {string} section The section number
 */
router.post('/', async (req, res, next) => {
  if (req.body.course === undefined) {
    res.status(400).json({msg: 'Please provide either a course id or both a couse id and a section'})
  } else {
    try {
      let courseInfo = await Course.getCourse(req.body.course, req.body.section)
      res.json(courseInfo)
      logger.log('info', `Fetched information for course: ${req.body.course}`)
    } catch (error) {
      req.errorText = `An error has occured when fetching specific course: ${req.body.course}`
      next(error)
    }
  }
})

/**
 * Get courses from a specific term
 * @param {string} term The ID of term
 */
router.get('/term/:term', async (req, res, next) => {
  try {
    let courseInfo = await Course.getCoursesByTerm(req.params.term)
    res.json(courseInfo)
    logger.log('info', `Fetched information for all courses in term: ${req.params.term}`)
  } catch (error) {
    req.errorText = `An error has occured when fetching courses from the term: ${req.params.term}`
    next(error)
  }
})

module.exports = router
