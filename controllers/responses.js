'use strict'

const courses = require('./courses')
const terms = require('./terms')
const database = require('../services/database')

const IntentRequest = require('../models/IntentRequest')
const IntentResponse = require('../models/IntentResponse')
const IntentFulfillment = require('../models/IntentFulfillment')

/** Class that defines responses that will be sent to Dialogflow */
class Responses {
  /**
   * Create a new request to be processed for Dialogflow
   * @param {string} queryText The original query text resolved by Dialogflow
   * @param {Array.string} parameters Any parameters for the request
   * @param {string} intent The intent the request matched
   * @returns {IntentRequest} The intent request created from the incoming request
   */
  static createRequest (queryText, parameters, intent) {
    return new IntentRequest(queryText, parameters, intent)
  }

  /**
   * Get the correct intent fulfillment from the database
   * @param {string} intent The intent to fulfill
   * @returns {IntentFulfillment} The fulfillment of the intent
   */
  static async getIntentFulfillment (intent) {
    let intentInfo = await database.getIntent(intent)
    return new IntentFulfillment(intentInfo[0].fulfillmentText, intentInfo[0].fulfillmentError, (intentInfo[0].fulfillmentFunction === 1) ? this.getFulfillmentFunction(intentInfo[0].intent) : null)
  }

  /**
   * Get the correct fulfillment function for the intent given.
   * @param {string} intent The intent to fulfill
   * @returns {IntentFulfillment} The fulfillment function for the given intent
   */
  static getFulfillmentFunction (intent) {
    switch (intent) {
      case 'coursesOfferedDuringTerm':
        return async (request) => {
          let courseInfo = await courses.getCoursesByTerm(request.parameters.term)
          if (courseInfo.hasOwnProperty('msg') || typeof courseInfo === 'undefined') return ''
          let courseList = []
          courseInfo.forEach(course => courseList.push(course.title))
          return courseList.join(', ')
        }
      case 'whenIsTheRegistrationDeadline':
        return async (request) => {
          let termInfo = await terms.getTerm(request.parameters.term)
          if (termInfo.hasOwnProperty('msg') || typeof termInfo === 'undefined') return ''
          return termInfo.deadline
        }
      case 'completeListOfCoursesOffered':
        return async (request) => {
          let courseInfo = await courses.getAllCourses()
          if (courseInfo.hasOwnProperty('msg') || typeof courseInfo === 'undefined') return ''
          let courseList = []
          courseInfo.forEach(course => courseList.push(`${course.title} in the ${course.term} term`))
          return courseList.join(', ')
        }
    }
  }

  /**
   * Create a response to a Dialogflow request that can be sent back to Dialogflow
   * @param {IntentRequest} request The request used to create a response
   */
  static async createResponse (request) {
    let fulfillment = await this.getIntentFulfillment(request.intent)
    if (fulfillment.hasFunction()) {
      let fulfillmentData = await fulfillment.fulfillmentFunction(request)
      if (fulfillmentData === '') return new IntentResponse(fulfillment.fulfillmentError)
      return new IntentResponse(fulfillment.fulfillmentText.replace('#@#', fulfillmentData))
    } else {
      return new IntentResponse(fulfillment.fulfillmentText)
    }
  }
}

module.exports = Responses
