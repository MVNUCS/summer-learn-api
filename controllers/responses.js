'use strict'

const courses = require('./courses')

const IntentRequest = require('../models/IntentRequest')
const IntentResponse = require('../models/IntentResponse')
const IntentFulfillment = require('../models/IntentFulfillment')

/** This object stores our intents. TODO: Replace with a dynamic solution */
const INTENTS = {
  coursesOfferedDuringTerm: 'courses-offered-during-term',
  whatIsTheCostPerCreditHour: 'what-is-cost-per-credit',
  canSummerLearnCoursesBeTransfered: 'can-transfer-summer-learn-courses'
}
Object.freeze(INTENTS)

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
   * Get the correct fulfillment for the intent given. TODO: Replace switch statement with a dynamic solution
   * @param {string} intent The intent to fulfill
   * @returns {IntentFulfillment} The intent fulfillment resolved from the requested intent
   */
  static getIntentFulfillment (intent) {
    switch (intent) {
      case INTENTS.coursesOfferedDuringTerm:
        return new IntentFulfillment(`The courses are as follows: #@#`, `It seems that there aren't any courses offered during that term!`, async (request) => {
          let courseInfo = await courses.getCoursesByTerm(request.parameters.term)
          if (courseInfo.length === 0 || typeof courseInfo === 'undefined') return ''
          let courseList = []
          courseInfo.forEach(course => courseList.push(course.courseId))
          return courseList.join(', ')
        })
      case INTENTS.whatIsTheCostPerCreditHour:
        return new IntentFulfillment(`The cost per credit hour is $200`)
      case INTENTS.canSummerLearnCoursesBeTransfered:
        return new IntentFulfillment(`Yes. MVNU makes the process real simple to request a transcript once your grades are posted for the Summer Learn courses.`)
      default:
        return new IntentFulfillment(`Sorry, I didn't understand the request, please try again later.`)
    }
  }

  /**
   * Create a response to a Dialogflow request that can be sent back to Dialogflow
   * @param {IntentRequest} request The request used to create a response
   */
  static async createResponse (request) {
    let fulfillment = this.getIntentFulfillment(request.intent)
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
