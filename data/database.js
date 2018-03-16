'use strict'

const logger = require('../config/logger')

/**
 * Returns whether the connection to the database is successful
 * @returns Health status of either green or red
 */
exports.checkHealth = function () {
  logger.log('info', 'checkHealth()')
  return new Promise((resolve, reject) => {
  })
}

/**
 * Inserts course info from Google Sheets
 * @param {string} info The course information to insert
 * @returns Whether the operation was successful or not
 */
exports.insertCourseInfo = function (info) {
  logger.log('info', 'insertCourseInfo()')
  return new Promise((resolve, reject) => {
  })
}

/**
 * Retrieves information about a specified course
 * @param {string} courseId The ID of the course
 * @param {number} sectionId The section of the course
 * @returns The course information in JSON format
 */
exports.getCourse = function (courseId, sectionId) {
  logger.log('info', 'getCourse()')
  return new Promise((resolve, reject) => {
  })
}
