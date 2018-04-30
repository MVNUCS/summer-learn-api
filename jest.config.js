'use strict'

module.exports = {
  verbose: true,
  projects: [
    {
      runner: 'jest-runner-standard',
      testMatch: ['<rootDir>/**/*.js'],
      displayName: 'Standard Linting'
    },
    {
      displayName: 'Unit Tests',
      testEnvironment: 'node',
      testPathIgnorePatterns: [
        '/node_modules/',
        '<rootDir>/__tests__/integration/',
        '<rootDir>/__tests__/utils.js'
      ]
    },
    {
      displayName: 'Integration Tests',
      testEnvironment: 'node',
      testPathIgnorePatterns: [
        '/node_modules/',
        '<rootDir>/__tests__/unit/',
        '<rootDir>/__tests__/utils.js'
      ]
    }
  ]
}
