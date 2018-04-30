'use strict'

const mysql = require('mysql')
const keys = require('../config/keys')

const mockCourses = `
  REPLACE INTO sections (course_id, section, title, term, instructor, inst_type, registered, cap, credits)
  VALUES ('TST-1003', 1, 'Test Course One', 'A6', 'T. Ester', 'F', 25, 100, 3),
         ('TST-1003', 2, 'Test Course One', 'B6', 'T. Ester', 'F', 25, 100, 3),
         ('TST-1024', 1, 'Test Course Two', 'B6', 'T. Ester', 'F', 15, 45, 4),
         ('TST-4032', 1, 'Test Course Three', 'C6', 'T. Ester', 'F', 10, 75, 2)
`

const mockIntents = `
  REPLACE INTO intents (intent, fulfillmentText, fulfillmentError, fulfillmentFunction)
  VALUES ('whatIsSummerLearn', 'Summer Learn is a program that provides competitively priced online summer courses for bright traditional undergraduate students.', '', 0),
         ('whatDoesSummerLearnCost', 'Summer Learn is a great opportunity for savings. The cost per credit hour is only $200. This is less than half the price of credit hours for fall or spring semester, making these classes an ideal way to earn your degree faster and save money.', '', 0),
         ('coursesOfferedDuringTerm', 'The courses are as follows: #@#', 'It seems that there are not any courses offered during that term.', 1)
`

const deleteAllIntents = `
  DELETE FROM intents
`

const deleteAllCourses = `
  DELETE FROM sections
`

exports.dialogflowTest = {
  'responseId': 'c127c183-1ed6-4f06-8817-07c6a3367d72',
  'queryResult': {
    'queryText': 'What can I take during the A6 term?',
    'parameters': {
      'term': 'A6'
    },
    'allRequiredParamsPresent': true,
    'fulfillmentMessages': [
      {
        'text': {
          'text': [
            ''
          ]
        }
      }
    ],
    'intent': {
      'name': 'projects/summer-learn-chat-bot/agent/intents/b11ec889-f271-4bb8-95e6-5d7d239a6ed6',
      'displayName': 'whatIsSummerLearn'
    },
    'intentDetectionConfidence': 0.91,
    'diagnosticInfo': {
      'webhook_latency_ms': 1199
    },
    'languageCode': 'en'
  }
}

/**
 * Insert mock courses into the database for testing
 */
exports.insertMockCourses = function () {
  let testConnection = mysql.createConnection(keys.database)
  return new Promise((resolve, reject) => {
    testConnection.connect((err) => {
      if (err) return reject(err)
      testConnection.query(mockCourses, (err, results, fields) => {
        if (err) return reject(err)
        return resolve(results)
      })
      testConnection.end()
    })
  })
}

/**
 * Insert mock intents into the database for testing
 */
exports.insertMockIntents = function () {
  let testConnection = mysql.createConnection(keys.database)
  return new Promise((resolve, reject) => {
    testConnection.connect((err) => {
      if (err) return reject(err)
      testConnection.query(mockIntents, (err, results, fields) => {
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
exports.clearCourses = function () {
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

/**
 * Remove all intents from the database
 */
exports.clearIntents = function () {
  let testConnection = mysql.createConnection(keys.database)
  return new Promise((resolve, reject) => {
    testConnection.connect(err => {
      if (err) return reject(err)
      testConnection.query(deleteAllIntents, (err, results, fields) => {
        if (err) return reject(err)
        return resolve(results)
      })
      testConnection.end()
    })
  })
}
