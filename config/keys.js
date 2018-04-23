'use strict'

/** Winston */
exports.logging = {
  loglevel: process.env.LOGGING_LEVEL
}

/** Express */
exports.express = {
  port: process.env.PORT
}

/** MySQL */
exports.database = {
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE
}

/** Google Sheets */
exports.sheets = {
  spreadsheetId: process.env.SPREADSHEET_ID,
  spreadsheetRange: process.env.SPREADSHEET_RANGE,
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  redirectURL: process.env.REDIRECT_URL,
  accessToken: process.env.ACCESS_TOKEN,
  refreshToken: process.env.REFRESH_TOKEN,
  expiryDate: process.env.EXPIRY_DATE
}

/** Jest */
exports.jest = {
  testKey: process.env.TEST_KEY
}
