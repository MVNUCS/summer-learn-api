'use strict'

const database = require('../services/database')
// const logger = require('../config/logger')

class Course {
  constructor (courseId, section, title, term, instructor, credits) {
    this.courseId = courseId
    this.section = section
    this.title = title
    this.term = term
    this.instructor = instructor
    this.credits = credits
  }

  /**
   * Test function using class info
   */
  speak () {
    return `${this.courseId}, section ${this.section} is taught by ${this.instructor} in the ${this.term} term`
  }

  /**
   * Get all courses
   * @return {Array.Course} An array of courses in the cache
   */
  static async getAllCourses () {
    try {
      let courseInfo = await database.getAllCourses()
      let courses = courseInfo.map(e => new this(e.course_id, e.section, e.title, e.term, e.instructor, e.credits))
      return courses
    } catch (error) {
      throw error
    }
  }

  /**
   * Get all courses with the specified courseId and sectionId
   * @param {string} courseId The ID of the course requested
   * @param {string} [sectionId] The ID of the section of the course requested
   * @return {Array.Course} An array of courses with the specified courseId and sectionId
   */
  static async getCourse (courseId, sectionId) {
    if (sectionId === undefined) {
      try {
        let courseInfo = await database.getAllSectionsOfCourse(courseId)
        let courses = courseInfo.map(e => new this(e.course_id, e.section, e.title, e.term, e.instructor, e.credits))
        return courses
      } catch (error) {
        throw error
      }
    } else {
      try {
        let courseInfo = await database.getCourse(courseId, sectionId)
        return new this(courseInfo[0].course_id, courseInfo[0].section, courseInfo[0].title, courseInfo[0].term, courseInfo[0].instructor, courseInfo[0].credits)
      } catch (error) {
        throw error
      }
    }
  }

  /**
   * Get all courses offered in the specified term
   * @param {string} term The ID of the term requested
   * @return {Array.Course} An array of courses offered in the specified term
   */
  static async getCoursesByTerm (term) {
    try {
      let courseInfo = await database.getCoursesByTerm(term)
      let courses = courseInfo.map(e => new this(e.course_id, e.section, e.title, e.term, e.instructor, e.credits))
      return courses
    } catch (error) {
      throw error
    }
  }
}

module.exports = Course
