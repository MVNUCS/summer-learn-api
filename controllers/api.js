'use strict'

const express = require('express')
const bodyParser = require('body-parser')

const logger = require('../config/logger')

const courses = require('../routes/courses')
const options = require('../routes/options')
const request = require('../routes/request')

const sheets = require('../services/sheets')
const database = require('../services/database')

class API {
  constructor (port) {
    this.port = port
  }

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

  async initServer () {
    /** The express server used to serve the API */
    const app = express()

    /** Middleware for getting information from a POST request */
    app.use(bodyParser.json())

    /** Routes for our API */
    app.use('/courses', courses)
    app.use('/options', options)
    app.use('/request', request)

    /** Default route handler */
    app.get('*', (req, res, next) => {
      res.json({msg: 'The resource requested does not exist on this server.'})
    })

    /** Error handler */
    app.use((err, req, res, next) => {
      logger.log('error', (req.errorText === undefined ? 'An error has occured' : req.errorText))
      logger.log('error', err)
      res.status(500).json({msg: `An error has occured. Please try again later`, text: req.errorText})
    })

    app.listen(this.port, () => {
      logger.log('info', `Server started on port ${this.port}`)
      API.updateCache()
        .then(() => {
          logger.log('info', `Initial cache update completed`)
        })
        .catch((err) => {
          logger.log('error', 'An error has occured during the initial cache update')
          logger.log('error', err)
        })
    })
  }
}

module.exports = API
