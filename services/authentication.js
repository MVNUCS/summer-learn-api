'use strict'

const fs = require('fs')
const logger = require('../config/logger')

let API_KEYS

/** Load our API keys for use */
try {
  let apiKeys = fs.readFileSync('apikeys.json')
  API_KEYS = JSON.parse(apiKeys)
  Object.freeze(API_KEYS)
} catch (error) {
  logger.log('error', 'An error has occured during the loading of API Keys.')
  logger.log('error', error)
}

const checkAPIKey = function (key) {
  let resolvedKey = API_KEYS.filter(entry => entry.key === key)
  if (resolvedKey.length === 0) return `denied`
  return resolvedKey[0].owner
}

exports.authenticate = function (req, res, next) {
  let key = req.get('X-API-KEY')
  let authorizedParty = checkAPIKey(key)
  if (authorizedParty !== 'denied') {
    req.username = authorizedParty
    next()
  } else {
    let ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress
    logger.log('warn', `[${ip}] Attempt to access endpoint without being authenticated`)
    res.status(401).json({msg: `The resource requested does not exist`})
  }
}
