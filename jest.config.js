'use strict'

module.exports = {
  projects: [
    {
      runner: 'jest-runner-standard',
      testMatch: ['<rootDir>/**/*.js'],
      displayName: 'standard linting'
    },
    {
      displayName: 'unit tests',
      testEnvironment: 'node'
    }
  ]
}
