'use strict'

/** Class representing a term in Summer Learn */
class Term {
  /**
   * Create a new term object
   * @param {string} term The ID of the term, formatted like A6
   * @param {Date} startDate The section number of the course
   * @param {Date} endDate The course title
   */
  constructor (term, startDate, endDate) {
    this.term = term
    this.startDate = startDate
    this.endDate = endDate
  }

  /**
   * Calculates the number of days in the term
   * @returns {number} The difference in days
   */
  getNumOfDaysInTerm () {
    return (this.endDate - this.startDate) / 86400000
  }
}

module.exports = Term
