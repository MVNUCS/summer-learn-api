'use strict'

const fs = require('fs')
const logger = require('../config/logger')

/** Load our API keys for use */
let apiKeys = fs.readFileSync('apikeys.json')
const API_KEYS = JSON.parse(apiKeys)
Object.freeze(API_KEYS)

class Authentication {
  static authenticate (req, res, next) {
    let key = req.get('X-API-AUTH')
    let authorizedParty = this.checkAPIKey(key)
    if (authorizedParty !== 'denied') {
      req.username = authorizedParty
      next()
    } else {
      let ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress
      logger.log('warn', `[${ip}] Attempt to access endpoint without being authenticated`)
      res.status(404).json({msg: `The resource requested does not exist`})
    }
  }

  static checkAPIKey (key) {
    let resolvedKey = API_KEYS.filter(entry => entry.key === key)
    if (resolvedKey.length === 0) return `denied`
    return resolvedKey[0].owner
  }
}

module.exports = Authentication
