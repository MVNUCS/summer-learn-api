'use strict'

const logger = require('../config/logger')

const sheets = require('../services/sheets')
const database = require('../services/database')

/**
 * Update the database with any new changes from Google Sheets
 */
exports.updateCache = async function () {
  logger.log('debug', `Database update requested...`)
  try {
    let courseInfo = await sheets.getCourseInfo()
    logger.log('debug', `Got course info from Sheets...`)
    let intentInfo = await sheets.getIntentInfo()
    logger.log('debug', `Got intent info from Sheets...`)
    let courses = []
    let intents = []
    intentInfo.values.forEach(intent => intents.push([intent[0], intent[1], intent[2], Number(intent[3])]))
    courseInfo.values.forEach((e) => courses.push([e[0].trim(), Number(e[1]), e[2].trim(), e[3].trim(), e[5].trim(), e[6].trim(), Number(e[7]), Number(e[8]), Number((e[0].trim().substring(e[0].trim().length - 1)))]))
    let courseResult = await database.insertCourseInfo(courses)
    logger.log('debug', `Inserted courses into database with ${courseResult.affectedRows} rows affected`)
    let intentResult = await database.insertIntentInfo(intents)
    logger.log('debug', `Inserted intents into database with ${intentResult.affectedRows} rows affected`)
    return {msg: `Database insert successful`, totalRowsAffected: courseResult.affectedRows + intentResult.affectedRows}
  } catch (error) {
    throw error
  }
}
