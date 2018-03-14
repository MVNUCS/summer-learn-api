'use strict'

/** Winston */
module.exports.logging = {
  loglevel: process.env.LOGGING_LEVEL
}

/** MySQL */
module.exports.database = {
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE
}

/** Google Sheets */
module.exports.sheets = {
  spreadsheetId: process.env.SPREADSHEET_ID,
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  redirectURL: process.env.REDIRECT_URL,
  accessToken: process.env.ACCESS_TOKEN,
  refreshToken: process.env.REFRESH_TOKEN
}
