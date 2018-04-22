'use strict'

/** Class representing responses to requests with a specified intent */
class IntentResponse {
  /**
   * Create a new response to send back to Dialogflow
   * @param {string} fulfillmentText The text to return to Dialogflow
   */
  constructor (fulfillmentText) {
    this.fulfillmentText = fulfillmentText
  }
}

module.exports = IntentResponse
