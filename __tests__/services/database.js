/* global describe beforeAll afterAll test expect  */
'use strict'
require('dotenv').config()

const database = require('../../services/database')
const mysql = require('mysql')
const keys = require('../../config/keys')

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
function insertMockCourses () {
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
function clearMockCourses () {
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
function clearAllCourses () {
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

/** Tests for the database service */
describe('Database', () => {
  beforeAll(() => {
    return insertMockCourses()
  })

  afterAll(() => {
    return clearMockCourses()
  })

  /** Test database connectivity */
  test('should be able to connect to the database', async () => {
    let result = await database.checkHealth()
    expect(result.msg).toBe(`Connection to database is successful`)
  })

  /** Test getCourse() */
  describe('getCourse', () => {
    /** Test valid input */
    test('should return a course when given a valid and existing course ID and section', async () => {
      let result = await database.getCourse('TST-1003', '2')
      expect(result[0].course_id).toBe('TST-1003')
    })

    /** Test valid yet non-existant input */
    test('should return an empty set when given a valid but non-existing course ID and section', async () => {
      let result = await database.getCourse('TST-1234', '1')
      expect(result).toHaveLength(0)
    })

    /** Test valid input with no data */
    test('should return an empty set when no courses exist in the database', async () => {
      await clearMockCourses()
      let result = await database.getCourse('TST-1003', '1')
      await insertMockCourses()
      expect(result).toHaveLength(0)
    })

    /** Test invalid input */
    test('should return an empty set when given an invalid course ID and section', async () => {
      let result = await database.getCourse('INVALID', 'INVALID')
      expect(result).toHaveLength(0)
    })

    /** Test exceptions */
    test('should return an exception if the database pool is closed', async () => {
      await database.closePool()
      await database.getCourse('TST-1003', '1').catch(e => expect(e.code).toEqual('POOL_CLOSED'))
      database.createPool()
    })
  })

  describe('getAllSectionsOfCourse', () => {
    /** Test valid input */
    test('should return all sections of a course when given just a valid course ID', async () => {
      let result = await database.getAllSectionsOfCourse('TST-1003')
      expect(result).toHaveLength(2)
    })

    /** Test valid yet non-existant input */
    test('should return an empty set when given a valid but non-existing course ID', async () => {
      let result = await database.getAllSectionsOfCourse('TST-1234')
      expect(result).toHaveLength(0)
    })

    /** Test valid input with no data */
    test('should return an empty set when no courses exist in the database', async () => {
      await clearMockCourses()
      let result = await database.getAllSectionsOfCourse('TST-1003')
      await insertMockCourses()
      expect(result).toHaveLength(0)
    })

    /** Test invalid input */
    test('should return an empty set when given an invalid course ID', async () => {
      let result = await database.getAllSectionsOfCourse('1234')
      expect(result).toHaveLength(0)
    })

    /** Test exceptions */
    test('should return an exception if the database pool is closed', async () => {
      await database.closePool()
      await database.getAllSectionsOfCourse('TST-1003').catch(e => expect(e.code).toEqual('POOL_CLOSED'))
      database.createPool()
    })
  })

  describe('getAllCourses', () => {
    /** Test valid use */
    test('should return all courses', async () => {
      let result = await database.getAllCourses()
      expect(result.length).toBeGreaterThanOrEqual(4)
    })

    /** Test valid usage with no data */
    test('should return an empty set when no courses exist in the database', async () => {
      await clearAllCourses()
      let result = await database.getAllCourses()
      expect(result).toHaveLength(0)
      await insertMockCourses()
    })

    /** Test exceptions */
    test('should return an exception if the database pool is closed', async () => {
      await database.closePool()
      await database.getAllCourses().catch(e => expect(e.code).toEqual('POOL_CLOSED'))
      database.createPool()
    })
  })

  describe('getCoursesByTerm', () => {
    // TODO: Add tests
  })

  describe('getAllTerms', () => {
    // TODO: Add tests
  })

  describe('getTerm', () => {
    // TODO: Add tests
  })

  describe('insertCourseInfo', () => {
    // TODO: Add tests
  })

  describe('getIntent', () => {
    // TODO: Add tests
  })
})
