'use strict'

const {google} = require('googleapis')
const OAuth2 = google.auth.OAuth2
const sheets = google.sheets('v4')

const logger = require('../config/logger')
const keys = require('../config/keys')

/** Create OAuth2 Client for authenticating to Google's APIs */
const authClient = new OAuth2(
  keys.sheets.clientId,
  keys.sheets.clientSecret,
  keys.sheets.redirectURL
)

/** Set the Google API to use our OAuth2 client we created for all authentication requests from here on out */
google.options({auth: authClient})

/** Load the tokens from envirnoment variables and set them in the OAuth2 client */
authClient.setCredentials({
  access_token: keys.sheets.accessToken,
  refresh_token: keys.sheets.refreshToken,
  expiry_date: keys.sheets.expiryDate
})

/**
 * Returns whether the connection to Google Sheets is successful
 * @returns Health status of either green or red
 */
exports.checkHealth = function () {
  logger.log('info', 'checkHealth()')
  return new Promise((resolve, reject) => {
  })
}

/**
 * Returns info on the courses in summer learn
 * @returns A JSON array of course information
 */
exports.getCourseInfo = function () {
  return new Promise((resolve, reject) => {
    sheets.spreadsheets.values.get({
      spreadsheetId: keys.sheets.spreadsheetId,
      range: keys.sheets.spreadsheetRange
    }, (err, response) => {
      if (err) return reject(err)
      return resolve(response.data)
    })
  })
}
