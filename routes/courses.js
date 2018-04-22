'use strict'

const express = require('express')
const router = express.Router()

const logger = require('../config/logger')
const courses = require('../controllers/courses')

/**
 * Gets all courses
 */
router.get('/', async (req, res, next) => {
  try {
    let courseInfo = await courses.getAllCourses()
    res.json(courseInfo)
    logger.log('info', `[${req.username}] Successfully fetched information for all courses`)
  } catch (error) {
    req.errorText = `${req.username}: An error has occured when fetching information for all courses`
    next(error)
  }
})

/**
 * Get a specific course
 * @param {string} courseId The ID of the course
 */
router.get('/:courseId', async (req, res, next) => {
  try {
    let courseInfo = await courses.getCourse(req.params.courseId)
    if (courseInfo.hasOwnProperty('msg')) {
      res.status(404).json(courseInfo)
      logger.log('warn', `[${req.username}] Attempted to fetch information for course ${req.params.courseId} but couldn't find anything`)
    } else {
      res.json(courseInfo)
      logger.log('info', `[${req.username}] Successfully fetched information for course ${req.params.courseId}`)
    }
  } catch (error) {
    req.errorText = `[${req.username}] An error has occured when attempting to fetch course ${req.params.CourseId}`
    next(error)
  }
})

/**
 * Get a specific course and section
 * @param {string} courseId The ID of the course
 * @param {number} sectionId The ID of the section
 */
router.get('/:courseId/:sectionId', async (req, res, next) => {
  try {
    let courseInfo = await courses.getCourse(req.params.courseId, req.params.sectionId)
    if (courseInfo.hasOwnProperty('msg')) {
      res.status(404).json(courseInfo)
      logger.log('warn', `[${req.username}] Attempted to fetch information for course ${req.params.courseId}:${req.params.sectionId} but couldn't find anything`)
    } else {
      res.json(courseInfo)
      logger.log('info', `[${req.username}] Successfully fetched information for course ${req.params.courseId}:${req.params.sectionId}`)
    }
  } catch (error) {
    req.errorText = `[${req.username}] An error has occured when attempting to fetch course ${req.params.CourseId}:${req.params.sectionId}`
    next(error)
  }
})

module.exports = router
