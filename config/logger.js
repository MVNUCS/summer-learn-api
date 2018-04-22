'use strict'

const winston = require('winston')
const config = require('./keys')

/**
 * Winston logger that sends to the console with a timestamp and color
 */
const logger = new winston.Logger({
  level: config.logging.loglevel,
  transports: [
    new winston.transports.Console({
      timestamp: true,
      colorize: true
    }),
    new winston.transports.File({
      name: 'log',
      filename: 'api.log'
    })
  ]
})

/**
 * Log a message using Winston
 * @param {string} level The log level to use when logging the message
 * @param {string} message The message to log
 * @param {Object} [metadata] Any optional metadata to include in the message
 */
module.exports.log = function (level, message, metadata) {
  (typeof metadata !== 'undefined') ? logger.log(level, message, metadata) : logger.log(level, message)
}
