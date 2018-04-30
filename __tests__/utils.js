'use strict'

const mysql = require('mysql')
const keys = require('../config/keys')

const createMockCourses = `
  REPLACE INTO sections (course_id, section, title, term, instructor, inst_type, registered, cap, credits)
  VALUES ('TST-1003', 1, 'Test Course One', 'A6', 'T. Ester', 'F', 25, 100, 3),
         ('TST-1003', 2, 'Test Course One', 'B6', 'T. Ester', 'F', 25, 100, 3),
         ('TST-1024', 1, 'Test Course Two', 'B6', 'T. Ester', 'F', 15, 45, 4),
         ('TST-4032', 1, 'Test Course Three', 'C6', 'T. Ester', 'F', 10, 75, 2)
`
const deleteMockCourses = `
  DELETE FROM sections
  WHERE course_id LIKE 'TST%'
`

const deleteAllCourses = `
  DELETE FROM sections
`

/**
 * Insert mock courses into the database for testing
 */
exports.insertMockCourses = function () {
  let testConnection = mysql.createConnection(keys.database)
  return new Promise((resolve, reject) => {
    testConnection.connect((err) => {
      if (err) return reject(err)
      testConnection.query(createMockCourses, (err, results, fields) => {
        if (err) return reject(err)
        return resolve(results)
      })
      testConnection.end()
    })
  })
}

/**
 * Remove the mock courses from the database
 */
exports.clearMockCourses = function () {
  let testConnection = mysql.createConnection(keys.database)
  return new Promise((resolve, reject) => {
    testConnection.connect(err => {
      if (err) return reject(err)
      testConnection.query(deleteMockCourses, (err, results, fields) => {
        if (err) return reject(err)
        return resolve(results)
      })
      testConnection.end()
    })
  })
}

/**
 * Remove all courses from the database
 */
exports.clearAllCourses = function () {
  let testConnection = mysql.createConnection(keys.database)
  return new Promise((resolve, reject) => {
    testConnection.connect(err => {
      if (err) return reject(err)
      testConnection.query(deleteAllCourses, (err, results, fields) => {
        if (err) return reject(err)
        return resolve(results)
      })
      testConnection.end()
    })
  })
}
