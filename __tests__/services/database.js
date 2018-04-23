/* global describe test expect  */
'use strict'
require('dotenv').config()

const database = require('../../services/database')

describe('Database Services', () => {
  test('should be able to connect to the database', async () => {
    let result = await database.checkHealth()
    expect(result.msg).toBe(`Connection to database is successful`)
  })
})
