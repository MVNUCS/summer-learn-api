'use strict'

/* global describe before it */
require('dotenv').config()

// const expect = require('chai').expect
const request = require('supertest')('http://localhost:8080')
const API = require('../../controllers/api')

const api = new API(8080)

const coursesOfferedDuringTermTest = {
  'id': 'e5caa467-e06c-463c-996c-c68a70a7b8fb',
  'timestamp': '2018-04-16T16:00:49.493Z',
  'lang': 'en',
  'result': {
    'source': 'agent',
    'resolvedQuery': 'What classes are available during the A6 term?',
    'action': '',
    'actionIncomplete': false,
    'parameters': {
      'term': 'A6'
    },
    'contexts': [],
    'metadata': {
      'intentId': 'b11ec889-f271-4bb8-95e6-5d7d239a6ed6',
      'webhookUsed': 'true',
      'webhookForSlotFillingUsed': 'false',
      'webhookResponseTime': 173,
      'intentName': 'courses-offered-during-term'
    }
  }
}

const correctSpeechResponse = {
  'speech': 'The courses are as follows: ART-1002, ECE-3032, ECO-1033, ENG-1063, HIS-1013, ICS-2003, MAT-1033, PED-1002, SCI-3012, SOC-1013',
  'displayText': 'The courses are as follows: ART-1002, ECE-3032, ECO-1033, ENG-1063, HIS-1013, ICS-2003, MAT-1033, PED-1002, SCI-3012, SOC-1013'
}

describe('/request', () => {
  before(async () => {
    await api.initServer()
  })

  it('should return the correct speech given a correct JSON request from Dialogflow', (done) => {
    request.post('/request')
      .set('Content-Type', 'application/json')
      .send(coursesOfferedDuringTermTest)
      .expect(200, correctSpeechResponse, done)
  })
})
