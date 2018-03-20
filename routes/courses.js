'use strict'

const express = require('express')
const router = express.Router()

const logger = require('../config/logger')

const database = require('../data/database')

/**
 * Gets all courses
 */
router.get('/', async (req, res, next) => {
  try {
    let courseInfo = await database.getAllCourses()
    res.json(courseInfo)
    logger.log('info', 'Fetched information for all courses')
  } catch (error) {
    logger.log('error', 'An error has occured when fetching all courses')
    logger.log('error', error)
    res.status(500).json({msg: `An error has occured while fetching all courses. Please try again later`})
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
      let courseInfo = await database.getCourse(req.body.course, req.body.section)
      res.json(courseInfo)
      logger.log('info', `Fetched information for course: ${req.body.course}:${req.body.section}`)
    } catch (error) {
      logger.log('error', `An error has occured when fetching specific course: ${req.body.course}:${req.body.section}`)
      logger.log('error', error)
      res.status(500).json({msg: `An error has occured fetching the specified course. Please try again later.`})
    }
  }
})

/**
 * Get courses from a specific term
 * @param {string} term The ID of term
 */
router.get('/term/:term', async (req, res, next) => {
  try {
    let courseInfo = await database.getCoursesByTerm(req.params.term)
    res.json(courseInfo)
    logger.log('info', `Fetched information for all courses in term: ${req.params.term}`)
  } catch (error) {
    logger.log('error', `An error has occured when fetching courses from the term: ${req.params.term}`)
    logger.log('error', error)
    res.status(500).json({msg: `An error has occured while fetching courses for that term. Please try again later.`})
  }
})

module.exports = router
