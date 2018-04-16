'use strict'

const Course = require('./course')

class Response {
  constructor (source, resolvedQuery, parameters, intentName, context) {
    this.source = source
    this.resolvedQuery = resolvedQuery
    this.parameters = parameters
    this.intentName = intentName
    this.context = context
  }

  async createResponse () {
    if (this.intentName === 'courses-offered-during-term') {
      try {
        let courses = await Course.getCoursesByTerm(this.parameters.term)
        let courseList = []
        courses.forEach(course => {
          courseList.push(course.courseId)
        })
        let responseObject = {
          'speech': `The courses are as follows: ${courseList.join(', ')}`,
          'displayText': `The courses are as follows: ${courseList.join(', ')}`
        }
        return responseObject
      } catch (error) {
        throw error
      }
    }
  }
}

module.exports = Response
