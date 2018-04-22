'use strict'

/** The class representing intent requests in Dialogflow */
class IntentRequest {
  /**
   * Create a new request for information
   * @param {string} queryText The original query text resolved by Dialogflow
   * @param {Array.string} parameters Any parameters for the request
   * @param {string} intent The intent the request matched
   */
  constructor (queryText, parameters, intent) {
    this.queryText = queryText
    this.parameters = parameters
    this.intent = intent
  }
}

module.exports = IntentRequest
