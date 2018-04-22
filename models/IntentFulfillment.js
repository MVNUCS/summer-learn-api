'use strict'

/** The class representing intent fulfillments */
class IntentFulfillment {
  /**
   * Create a new intent fulfillment
   * @param {*} fulfillmentText The text to return when the intent is fulfilled
   * @param {*} fulfillmentError The text to return when the intent fulfillment fails due to the function
   * @param {*} fulfillmentFunction The function to call when fulfillment requires extra data
   */
  constructor (fulfillmentText, fulfillmentError, fulfillmentFunction) {
    this.fulfillmentText = fulfillmentText
    this.fulfillmentError = fulfillmentError
    this.fulfillmentFunction = fulfillmentFunction
  }

  /**
   * Check to see if the fulfillment has a fulfillment function
   * @returns {boolean} Whether the fulfillment has a function or not
   */
  hasFunction () { return (typeof this.fulfillmentFunction === 'undefined' || this.fulfillmentFunction === null) }
}

module.exports = IntentFulfillment
