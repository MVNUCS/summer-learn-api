'use strict'

/* global describe it */
require('dotenv').config()
const expect = require('chai').expect
const API = require('../../controllers/api')

describe('API', () => {
  it('should update the cache from Google Sheets', async () => {
    expect((await API.updateCache()).affectedRows).to.be.greaterThan(0)
  })
})
