/* global describe it expect  */
'use strict'

require('dotenv').config()
process.env.LOGGING_LEVEL = 'error'
const request = require('supertest')

const app = require('../app')

/**
 * These tests make sure the general API is working
 */
describe('General API', () => {
  it('should return a 401 when no API Key is provided', () => {
    expect.assertions(2)
    return request(app).get('/')
      .expect(401)
      .then((res) => {
        expect(typeof res.body.msg).toBe('string')
        expect(res.body.msg).toBe('The resource requested does not exist')
      })
  })

  it('should return a 404 when an API Key is provided but the route is invalid', () => {
    expect.assertions(2)
    return request(app).get('/')
      .set('X-API-KEY', 'WyE5lpxEVh7jSbwkUO6WRsG2zTzy7sDl')
      .expect(404)
      .then((res) => {
        expect(typeof res.body.msg).toBe('string')
        expect(res.body.msg).toBe('The resource requested does not exist')
      })
  })
})