'use strict'

const database = require('../services/database')
const Term = require('../models/Term')

class Terms {
  /**
   * Get the term specified
   * @param {string} term The ID of the term
   * @return {Object} The term specified
   */
  static async getTerm (term) {
    try {
      let termInfo = await database.getTerm(term)
      if (termInfo.length === 0 || typeof termInfo === 'undefined') return {msg: `The request did not return any results`}
      return new Term(termInfo[0].term, new Date(termInfo[0].start_date), new Date(termInfo[0].end_date))
    } catch (error) {
      throw error
    }
  }
}

module.exports = Terms
