/* global describe test beforeAll afterAll */
'use strict'

process.env.NODE_ENV = 'test'
process.env.LOGGING_LEVEL = 'error'

const request = require('supertest')

const app = require('../../app')
const api = require('../../controllers/api')
const keys = require('../../config/keys')
const testUtils = require('../utils')

const dialogflowTest = {
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
      'displayName': 'coursesOfferedDuringTerm'
    },
    'intentDetectionConfidence': 0.91,
    'diagnosticInfo': {
      'webhook_latency_ms': 1199
    },
    'languageCode': 'en'
  }
}

describe('Route: Request', () => {
  beforeAll(() => {
    return api.updateCache()
  })

  afterAll(() => {
    return testUtils.clearAllCourses()
  })

  test('should return an appropriate fulfillmentText response when given a valid intent', () => {
    return request(app).post('/request')
      .set('Content-Type', 'application/json')
      .set('X-API-KEY', keys.jest.testKey)
      .send(dialogflowTest)
      .expect(200)
      .then((res) => {
        console.log(res.body)
      })
  })
})
