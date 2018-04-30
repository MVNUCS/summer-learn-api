/* global describe beforeEach test expect  */
'use strict'
require('dotenv').config()
process.env.NODE_ENV = 'testing'

const request = require('supertest')

const testUtils = require('../utils')
const app = require('../../app')
const keys = require('../../config/keys')

describe('Options Handler', () => {
  beforeEach(async () => {
    await testUtils.clearCourses()
    await testUtils.clearIntents()
  })

  test('should fetch information from Google Sheets and insert them into the database', () => {
    expect.assertions(3)
    return request(app).get('/options/update')
      .set('X-API-KEY', keys.jest.testKey)
      .expect(200)
      .then(res => {
        expect(typeof res.body.msg).toBe('string')
        expect(typeof res.body.totalRowsAffected).toBe('number')
        expect(res.body.totalRowsAffected).toBeGreaterThan(50)
      })
  })
})
