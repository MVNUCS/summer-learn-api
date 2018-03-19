'use strict'

const logger = require('../config/logger')
const keys = require('../config/keys')
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
      connection.query(`
        REPLACE INTO sections (course_id, section, title, term, instructor, inst_type, registered, cap, credits)
        VALUES ?
        `,
      [info], function (err, results, fields) {
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
      connection.query(`
        SELECT *
        FROM sections
        WHERE course_id = ? AND section = ?
      `, [courseId, sectionId], (err, results, fields) => {
        if (err) {
          return reject(err)
        }
        return resolve(results[0])
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
      connection.query(`
        SELECT *
        FROM sections
        ORDER BY course_id, section ASC
      `, (err, results, fields) => {
        if (err) {
          return reject(err)
        }
        return resolve(results)
      })
      connection.release()
    })
  })
}
