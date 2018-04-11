'use strict'

const sheets = require('../services/sheets')
const database = require('../services/database')

const logger = require('../config/logger')

class API {
  static async updateCache () {
    logger.log('debug', `Database update requested...`)
    try {
      let courseInfo = await sheets.getCourseInfo()
      logger.log('debug', `Got course info from Sheets...`)
      let courses = []
      courseInfo.values.forEach((e) => {
        let course = [e[0].trim(), Number(e[1]), e[2].trim(), e[3].trim(), e[5].trim(), e[6].trim(), Number(e[7]), Number(e[8]), Number((e[0].trim().substring(e[0].trim().length - 1)))]
        courses.push(course)
      })
      let result = await database.insertCourseInfo(courses)
      logger.log('debug', `Database operation complete with ${result.affectedRows} rows affected`)
      return result
    } catch (error) {
      throw error
    }
  }
}

module.exports = API
