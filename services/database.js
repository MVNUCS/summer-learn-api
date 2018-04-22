'use strict'

const logger = require('../config/logger')
const keys = require('../config/keys')
const queries = require('../config/queries')
const mysql = require('mysql')

const pool = mysql.createPool(keys.database)

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
 * Retrieves information about a specified course
 * @param {string} courseId The ID of the course
 * @param {number} sectionId The section of the course
 * @returns The course information in JSON format
 */
exports.getCourse = function (courseId, sectionId) {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        return reject(err)
      }
      let query = ''
      if (sectionId === undefined) {
        query = queries.getAllSectionsOfCourse
      } else {
        query = queries.getCourse
      }
      connection.query(query, [courseId, sectionId], (err, results, fields) => {
        if (err) {
          return reject(err)
        }
        return resolve(results)
      })
      connection.release()
    })
  })
}

/**
 * Retrieves information about all sections of a specified course
 * @param {string} courseId The ID of the course
 * @returns The course information in JSON format
 */
exports.getAllSectionsOfCourse = function (courseId) {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        return reject(err)
      }
      connection.query(queries.getAllSectionsOfCourse, [courseId], (err, results, fields) => {
        if (err) {
          return reject(err)
        }
        return resolve(results)
      })
      connection.release()
    })
  })
}

/**
 * Retrieves information about all courses in the database
 * @returns The course information in JSON format
 */
exports.getAllCourses = function () {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        return reject(err)
      }
      connection.query(queries.getAllCourses, (err, results, fields) => {
        if (err) {
          return reject(err)
        }
        return resolve(results)
      })
      connection.release()
    })
  })
}

/**
 * Retrieves information about courses in a specific term
 * @param {string} term The ID of the term
 * @returns The course information in JSON format
 */
exports.getCoursesByTerm = function (term) {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        return reject(err)
      }
      connection.query(queries.getCoursesByTerm, [term], (err, results, fields) => {
        if (err) {
          return reject(err)
        }
        return resolve(results)
      })
      connection.release()
    })
  })
}

/**
 * Retrieve the dates of the term specified
 * @param {string} term The ID of the term
 * @returns The term dates in JSON format
 */
exports.getTermDates = function (term) {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) return reject(err)
      connection.query(queries.getTermDates, [term], (err, results, fields) => {
        if (err) return reject(err)
        return resolve(results)
      })
      connection.release()
    })
  })
}

/**
 * Inserts course info from Google Sheets
 * @param {string} info The course information to insert
 * @returns Whether the operation was successful or not
 */
exports.insertCourseInfo = function (info) {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        return reject(err)
      }
      connection.query(queries.insertCourseInfo, [info], function (err, results, fields) {
        if (err) {
          return reject(err)
        }
        return resolve(results)
      })
      connection.release()
    })
  })
}

/**
 * Close the connection pool
 */
exports.closePool = function () {
  return new Promise((resolve, reject) => {
    pool.end(err => {
      if (err) return reject(err)
      return resolve()
    })
  })
}
