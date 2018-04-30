'use strict'

module.exports = {
  verbose: true,
  projects: [
    {
      runner: 'jest-runner-standard',
      testMatch: ['<rootDir>/**/*.js'],
      displayName: 'standard linting'
    },
    {
      displayName: 'unit tests',
      testEnvironment: 'node',
      testPathIgnorePatterns: [
        '/node_modules',
        '<rootDir>/__tests__/utils.js'
      ]
    }
  ]
}
