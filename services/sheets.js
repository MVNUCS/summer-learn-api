'use strict'

const {google} = require('googleapis')
const OAuth2 = google.auth.OAuth2
const sheets = google.sheets('v4')

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
  return new Promise((resolve, reject) => {
    sheets.spreadsheets.values.get({
      spreadsheetId: `1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms`,
      range: `Class Data!A1`
    }, (err, response) => {
      if (err) return reject(err)
      return resolve({msg: `Connection to Google Sheets is successful`})
    })
  })
}

/**
 * Returns info on the courses in summer learn
 * @returns A JSON array of course information
 */
exports.getCourseInfo = function () {
  return new Promise((resolve, reject) => {
    sheets.spreadsheets.values.get({
      spreadsheetId: keys.sheets.sectionSpreadsheetId,
      range: keys.sheets.sectionSpreadsheetRange
    }, (err, response) => {
      if (err) return reject(err)
      return resolve(response.data)
    })
  })
}

/**
 * Returns info for intent fulfillment
 * @returns A JSON array of intent info
 */
exports.getIntentInfo = function () {
  return new Promise((resolve, reject) => {
    sheets.spreadsheets.values.get({
      spreadsheetId: keys.sheets.intentSpreadsheetId,
      range: keys.sheets.intentSpreadsheetRange
    }, (err, response) => {
      if (err) return reject(err)
      return resolve(response.data)
    })
  })
}
