/* global describe test expect  */
'use strict'
require('dotenv').config()
process.env.NODE_ENV = 'testing'

const sheets = require('../../../services/sheets')

describe('Google Sheets', () => {
  test('should be able to connect to Google Sheets', async () => {
    let result = await sheets.checkHealth()
    expect(result.msg).toBe(`Connection to Google Sheets is successful`)
  })
})
