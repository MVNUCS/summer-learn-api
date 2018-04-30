/* global describe test expect beforeAll afterAll */
'use strict'

process.env.NODE_ENV = 'testing'
process.env.LOGGING_LEVEL = 'error'

const request = require('supertest')

const app = require('../../../app')
const keys = require('../../../config/keys')
const testUtils = require('../../utils')

describe('Request Handler', () => {
  beforeAll(async () => {
    await testUtils.insertMockCourses()
    await testUtils.insertMockIntents()
  })

  afterAll(async () => {
    await testUtils.clearCourses()
    await testUtils.clearIntents()
  })

  test('should return an appropriate fulfillmentText response when given a valid intent', () => {
    expect.assertions(2)
    return request(app).post('/request')
      .set('Content-Type', 'application/json')
      .set('X-API-KEY', keys.jest.testKey)
      .send(testUtils.dialogflowTest)
      .expect(200)
      .then((res) => {
        expect(typeof res.body.fulfillmentText).toBe('string')
        expect(res.body.fulfillmentText).toBe('Summer Learn is a program that provides competitively priced online summer courses for bright traditional undergraduate students.')
      })
  })
})
