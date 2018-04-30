/* global describe beforeEach test expect  */
'use strict'
require('dotenv').config()
process.env.NODE_ENV = 'testing'

const request = require('supertest')

const testUtils = require('../utils')
const app = require('../../app')
const keys = require('../../config/keys')

describe('Response Handler', () => {
  beforeEach(async () => {
    await testUtils.clearCourses()
    await testUtils.clearIntents()
  })

  test('should fetch information from Google Sheets and then return a successful response to Dialogflow', () => {
    expect.assertions(5)
    return request(app).get('/options/update')
      .set('X-API-KEY', keys.jest.testKey)
      .expect(200)
      .then(res => {
        expect(typeof res.body.msg).toBe('string')
        expect(typeof res.body.totalRowsAffected).toBe('number')
        expect(res.body.totalRowsAffected).toBeGreaterThan(50)
        return request(app).post('/request')
          .set('X-API-KEY', keys.jest.testKey)
          .set('Content-Type', 'application/json')
          .send(testUtils.dialogflowTest)
          .expect(200)
          .then((res) => {
            expect(typeof res.body.fulfillmentText).toBe('string')
            expect(res.body.fulfillmentText).toBe('Summer Learn is a program that provides competitively priced online summer courses for bright traditional undergraduate students.')
          })
      })
  })
})
