'use strict'

/** Class representing a course in Summer Learn */
class Course {
  /**
   * Create a new course object
   * @param {string} courseId The ID of the course, formatted like ABC-1234
   * @param {number} section The section number of the course
   * @param {string} title The course title
   * @param {string} term The term the course is offered
   * @param {string} instructor The professor teaching the course
   * @param {number} credits The number of credits the course is worth
   */
  constructor (courseId, section, title, term, instructor, credits) {
    this.courseId = courseId
    this.section = section
    this.title = title
    this.term = term
    this.instructor = instructor
    this.credits = credits
  }
}

module.exports = Course
